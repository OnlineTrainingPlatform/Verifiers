import { IQueryResult } from './i_query_result';
import { VerifytaResult } from './verifyta_result';

export class VerifytaOutputParser {
  private _output: string;

  constructor() {
    this._output = '';
  }

  parse(verifytaOuput: string, queries: Array<string>): IQueryResult {
    throw console.error('not implemented');
  }
}
