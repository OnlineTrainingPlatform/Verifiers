import { IQueryVerifier } from './i_query_verifier';
import { VerifytaOutputParser } from './verifyta_output_parser';
import { VerifytaEnvironment } from './verifyta_environment';
import { IQueryResult } from './i_query_result';
import { VerifytaResult } from './verifyta_result';

export class VerifytaVerifier implements IQueryVerifier {
  private readonly parser: VerifytaOutputParser;
  private readonly environment: VerifytaEnvironment;

  constructor(
    verifytaOutputParser: VerifytaOutputParser | undefined,
    environment: VerifytaEnvironment | undefined,
  ) {
    this.parser = verifytaOutputParser ?? new VerifytaOutputParser();
    this.environment = environment ?? new VerifytaEnvironment();
  }

  /**
   * Verify an xml solution with input queries
   * @param xmlFile
   * @param queries
   * @returns result of verification
   */
  async verifySolution(
    xmlFile: string,
    queries: string[],
  ): Promise<IQueryResult> {
    let execution_result = await this.environment.execute(xmlFile, queries);

    // If any queries may use an "unkown identifier" then we want to still run the other queries.
    const incorrect_queries = this.parser.incorrect_queries(execution_result);
    if (incorrect_queries.length > 0) {
      // First, remove the queries which had an error by creating a new set of queries.
      const correct_queries: string[] = [];
      for (let i = 0; i < queries.length; i++) {
        if (!incorrect_queries.includes(i)) {
          correct_queries.push(queries[i]);
        }
      }

      // Second, rerun verifyta with correct queries (if any)
      if (correct_queries.length > 0) {
        execution_result = await this.environment.execute(
          xmlFile,
          correct_queries,
        );
      }

      // Third parse new result
      const query_results = this.parser.parse(
        execution_result,
        correct_queries,
      ).passedQueriesResults;

      // Fourth, mark all errorfull queries as "not satisfied"
      for (const query of incorrect_queries) {
        query_results.set(queries[query], false);
      }

      // Fifth, order the queries to match the original
      const ordered_query_results: Map<string, boolean> = new Map<
        string,
        boolean
      >();
      for (let i = 0; i < queries.length; i++) {
        const query = queries[i];
        ordered_query_results.set(query, query_results.get(query)!);
      }

      return new VerifytaResult(ordered_query_results, false, true);
    }

    return this.parser.parse(execution_result, queries);
  }
}
