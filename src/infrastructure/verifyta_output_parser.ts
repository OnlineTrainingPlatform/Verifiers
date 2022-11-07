import { IQueryResult } from './i_query_result';
import { ICmdResult } from './i_cmd_result';

export class VerifytaOutputParser {
  private _output: string;

  constructor() {
    this._output = '';
  }

  parse(verifytaOuput: ICmdResult, queries: Array<string>): IQueryResult {
    //If there is a syntax error
    if (verifytaOuput.cmdError) {
      //TODO: check if we could use verifyta error instead!
      return {
        hasSyntaxErrors: true,
        passedQueriesResults: this.createMapAllFalse(queries),
      };
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

    return { hasSyntaxErrors: false, passedQueriesResults: queryMap };
  }

  createMapAllFalse(queries: Array<string>): Map<string, boolean> {
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
