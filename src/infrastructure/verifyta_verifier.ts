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
    const incorrect_queries = this.parser.incorrect_queries(execution_result)
    if (incorrect_queries.length > 0) {
      // First, remove the queries which had an error by creating a new set of queries.
      const correct_queries: string[] = []
      for (let i = 0; i < queries.length; i++) {
        if (!incorrect_queries.includes(i + 1)) {
          correct_queries.push(queries[i]);
        }
      }
      // Second, rerun verifyta with correct queries (if any)
      if (correct_queries.length > 0) {
        execution_result = await this.environment.execute(xmlFile, correct_queries);
      }
      // Third parse new result
      const parser_result = new VerifytaResult(
        this.parser.parse(execution_result, correct_queries).passedQueriesResults,
        false,
        true
      )

      // Third, mark all errorfull queries as "not satisfied"
      for (const query of incorrect_queries) {
        parser_result.passedQueriesResults.set(queries[query - 1], false);
      }

      return parser_result;
    }

    return this.parser.parse(execution_result, queries);
  }
}
