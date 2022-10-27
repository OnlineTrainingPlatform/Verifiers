import { IVerifier } from './i_verifier';
import { VerifytaResult } from './verifyta_result';
import { VerifytaOutputParser } from './verifyta_output_parser';
import { VerifytaEnvironment } from './verifyta_environment';

export class VerifytaVerifier implements IVerifier {
  private readonly parser: VerifytaOutputParser;
  private readonly environment: VerifytaEnvironment;

  constructor(
    verifytaOutputParser: VerifytaOutputParser,
    environment: VerifytaEnvironment,
  ) {
    this.parser = verifytaOutputParser;
    this.environment = environment;
  }

  verifySolution(xmlFile: string): VerifytaResult {
    const result = this.environment.execute(xmlFile);
    return this.parser.parse(result);
  }
}
