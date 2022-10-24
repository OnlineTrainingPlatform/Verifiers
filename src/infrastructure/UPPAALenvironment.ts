import { VerifytaResult } from './VerifytaResult';

export class UPPAALenvironment {
  private readonly _xmlFile: string;
  private readonly _result?: VerifytaResult;

  // todo
  constructor(xmlFile: string) {
    this._xmlFile = xmlFile;
    this._result = undefined;
  }

  execute(): verifytaOutput {}

  get result(): VerifytaResult | undefined {
    return this._result;
  }
}
