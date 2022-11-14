import { IQueryResult } from './i_query_result';
import { ICmdResult } from './i_cmd_result';
import { VerifytaResult } from './verifyta_result';

export class VerifytaOutputParser {
  /**
   * Parses the ICmdResult created by the VerifytaEnvironment.execute() function.
   * Will create an IQueryResult based on the queries parsing or failing and whether
   * there are syntax errors or parser errors.
   * @param verifytaOuput the output from VerifytaEnvironments execute
   * @param queries An array of the names of each query run
   * @returns the parsed result as an IQueryResult
   */
  parse(verifytaOuput: ICmdResult, queries: Array<string>): IQueryResult {
    //If there is a syntax error
    if (verifytaOuput.verifierError.includes('syntax error')) {
      return new VerifytaResult(
        this.createQueryMapAllFalse(queries),
        true,
        false,
      );
    }

    //If there is a parser error
    if (verifytaOuput.verifierError.includes('parser error')) {
      return new VerifytaResult(
        this.createQueryMapAllFalse(queries),
        false,
        true,
      );
    }

    //Check queries
    const lines = verifytaOuput.verifierOutput.split('\n');
    const queryMap = new Map<string, boolean>();
    let queryNumber = 0;

    // Go through entire output
    // if a line includes "verifying formula", the next line
    // will tell if it was satisfied or not
    // update query in map depending
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
    return new VerifytaResult(queryMap, false, false);
  }

  /**
   * Creates a map from an array of queries, and mapping each query to false.
   * @param queries to create the map with
   * @returns a map, mapping each query to boolean false
   */
  private createQueryMapAllFalse(queries: Array<string>): Map<string, boolean> {
    const map = new Map<string, boolean>();
    queries.forEach((query) => {
      map.set(query, false);
    });

    return map;
  }
}
