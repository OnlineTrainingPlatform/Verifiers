import { IQueryResult } from './i_query_result';
import { ICmdResult } from './i_cmd_result';

export class VerifytaOutputParser {
  private _output: string;

  constructor() {
    this._output = '';
  }

  parse(verifytaOuput: ICmdResult, queries: Array<string>): IQueryResult {
    throw console.error('not implemented');
  }
}
