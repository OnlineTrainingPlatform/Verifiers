import { IQueryResult } from './i_query_result';
import { ICmdResult } from './i_cmd_result';
import { VerifytaResult } from './verifyta_result';

export class VerifytaOutputParser {
  /**
   * Parses the ICmdResult created by the VerifytaEnvironments Execute function.
   * Will create an IQueryResult based on the queries passed, or failed and with
   * there are syntax errors.
   * @param verifytaOuput the output from VerifytaEnvironments execute
   * @param queries An array of the names of each query run
   * @returns the parsed result as an IQueryResult
   */
  parse(verifytaOuput: ICmdResult, queries: Array<string>): IQueryResult {
    //If there is a syntax error
    //VerifierError will only be non-empty if there is an error
    if (verifytaOuput.verifierError != '') {
      return new VerifytaResult(this.createMapAllFalse(queries), true, false);
    }

    //If there is an xml error
    //VerifierOutput will only be non-empty if there is an error
    if (verifytaOuput.verifierOutput == '') {
      return new Error()
    }

    //Check queries
    const lines = verifytaOuput.verifierOutput.split('\n');
    const queryMap = new Map<string, boolean>();
    let queryNumber = 0;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('Verifying formula')) {
        if (lines[i + 1].includes('Formula is satisfied')) {
          queryMap.set(queries[queryNumber], true);
        } else if (lines[i + 1].includes('Formula is NOT satisfied')) {
          queryMap.set(queries[queryNumber], false);
        }
        queryNumber++;
      }
    }
    return new VerifytaResult(queryMap, false);
  }

  /**
   * Creates a map from an array of queries, and mapping each query to false.
   * @param queries to create the map with
   * @returns a map, mapping each query to boolean false
   */
  private createMapAllFalse(queries: Array<string>): Map<string, boolean> {
    const map = new Map<string, boolean>();
    queries.forEach((query) => {
      map.set(query, false);
    });

    return map;
  }
}

// import * as testStrings from '../test_files/test_verifyta_output_strings';
// const verifytaOutput = testStrings.two_queries_passing;
// const queries = ['query_1', 'query_2'];
// const queriesPassed = new Map<string, boolean>([
//   ['query_1', true],
//   ['query_2', true],
// ]);

// const cmdRes = {
//   verifierOutput: verifytaOutput,
//   verifierError: '',
//   cmdError: '',
// };

// const parser = new VerifytaOutputParser();
// const parsed = parser.parse(cmdRes, queries);
// console.log(parsed.passedQueriesResults);
