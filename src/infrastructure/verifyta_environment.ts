import { VerifytaResult } from './verifyta_result';

export class VerifytaEnvironment {
  private readonly _result?: VerifytaResult;

  // todo
  constructor() {
    this._result = undefined;
  }

  execute(xmlFile: string): string {
    throw new Error('not Implemented');
  }

  get result(): VerifytaResult | undefined {
    return this._result;
  }
}
