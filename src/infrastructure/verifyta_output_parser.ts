import { IQueryResult } from './i_query_result';
import { ICmdResult } from './i_cmd_result';
import { VerifytaResult } from './verifyta_result';
import Os from 'os';

export class VerifytaOutputParser {
  /**
   * Parses the ICmdResult created by the VerifytaEnvironment.execute() function.
   * Will create an IQueryResult based on the queries parsing or failing and whether
   * there are syntax errors or parser errors.
   * @param verifytaOuput the output from VerifytaEnvironments execute
   * @param queries An array of the names of each query run
   * @returns the parsed result as an IQueryResult
   */
  parse(verifytaOuput: ICmdResult, queries: string[]): IQueryResult {
    //If there is a syntax error
    if (verifytaOuput.verifierError.includes('syntax error')) {
      return new VerifytaResult(
        this.createQueryMapAllFalse(queries),
        true,
        false,
      );
    }

    //If there is a parser error
    if (
      verifytaOuput.verifierError.includes('parser error') ||
      verifytaOuput.verifierError.includes('[error]')
    ) {
      return new VerifytaResult(
        this.createQueryMapAllFalse(queries),
        false,
        true,
      );
    }

    /* Where query contains a location unkown in the model
    ./test-models/lightswitch_oneQueriesFailingOnePassing.xml::1: [error] Unknown identifier: Boy0.
    ./test-models/lightswitch_oneQueriesFailingOnePassing.xml::1: [error] false is not a structure.
    ./test-models/lightswitch_oneQueriesFailingOnePassing.xml::1: [error] Unknown identifier: Boy1.
    ./test-models/lightswitch_oneQueriesFailingOnePassing.xml::1: [error] false is not a structure.
    ./test-models/lightswitch_oneQueriesFailingOnePassing.xml::2: [error] Unknown identifier: Observer0.
    ./test-models/lightswitch_oneQueriesFailingOnePassing.xml::2: [error] false is not a structure.
    ./test-models/lightswitch_oneQueriesFailingOnePassing.xml::2: [error] Unknown identifier: Observer0.
    ./test-models/lightswitch_oneQueriesFailingOnePassing.xml::2: [error] false is not a structure
    */

    /* Example with query file
    Verifying formula 1 at q1.q:1
    -- Formula is NOT satisfied.
    -- States stored : 1 states
    -- States explored : 0 states
    -- CPU user time used : 0 ms
    -- Virtual memory used : 48624 KiB
    -- Resident memory used : 9136 KiB
   
   Verifying formula 2 at q1.q:2
    -- Formula is satisfied.
    -- States stored : 9 states
    -- States explored : 9 states
    -- CPU user time used : 0 ms
    -- Virtual memory used : 48624 KiB
    -- Resident memory used : 9196 KiB
    */

    /* Example without a query file
    Verifying formula 1 at /nta/queries/query[1]/formula
    -- Formula is NOT satisfied.
    -- States stored : 1 states
    -- States explored : 0 states
    -- CPU user time used : 0 ms
    -- Virtual memory used : 48612 KiB
    -- Resident memory used : 8880 KiB
   
   Verifying formula 2 at /nta/queries/query[2]/formula
    -- Formula is satisfied.
    -- States stored : 9 states
    -- States explored : 9 states
    -- CPU user time used : 0 ms
    -- Virtual memory used : 48612 KiB
    -- Resident memory used : 9192 KiB
    */

    //Check queries
    const lines = verifytaOuput.verifierOutput.split(Os.EOL);
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
