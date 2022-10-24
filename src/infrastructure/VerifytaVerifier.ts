import { setFlagsFromString } from 'v8';
import { IVerifier } from './IVerifier';
import { VerifytaResult } from './VerifytaResult';
import { VerifytaOutputParser } from './VerifytaOutputParser';

export class VerifytaVerifier implements IVerifier {
  private readonly parser: VerifytaOutputParser;

  constructor() {
    this.parser = new VerifytaOutputParser();
  }

  verifySolution(xmlFile: string): VerifytaResult {
    throw new Error('Method not implemented.');
  }
}
