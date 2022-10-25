import { VerifytaResult } from './VerifytaResult';

export class UPPAALenvironment {
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
