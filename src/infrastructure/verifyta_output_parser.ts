import { VerifytaResult } from './verifyta_result';

export class VerifytaOutputParser {
  private _output: string;

  constructor() {
    this._output = '';
  }

  parse(verifytaOuput: string): VerifytaResult {
    throw console.error('not implemented');
  }
}
