import { IVerifier } from './IVerifier';
import { VerifytaResult } from './VerifytaResult';
import { VerifytaOutputParser } from './VerifytaOutputParser';
import { UPPAALenvironment } from './UPPAALenvironment';

export class VerifytaVerifier implements IVerifier {
  private readonly parser: VerifytaOutputParser;
  private readonly environment: UPPAALenvironment;

  constructor(
    verifytaOutputParser: VerifytaOutputParser,
    environment: UPPAALenvironment,
  ) {
    this.parser = verifytaOutputParser;
    this.environment = environment;
  }

  verifySolution(xmlFile: string): VerifytaResult {
    const result = this.environment.execute(xmlFile);
    return this.parser.parse(result);
  }
}
