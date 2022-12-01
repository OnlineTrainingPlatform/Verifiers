import { IQueryVerifier } from './i_query_verifier';
import { VerifytaOutputParser } from './verifyta_output_parser';
import { VerifytaEnvironment } from './verifyta_environment';
import { IQueryResult } from './i_query_result';

export class VerifytaVerifier implements IQueryVerifier {
  private readonly parser: VerifytaOutputParser;
  private readonly environment: VerifytaEnvironment;

  constructor(
    verifytaOutputParser: VerifytaOutputParser | undefined,
    environment: VerifytaEnvironment | undefined,
  ) {
    this.parser = verifytaOutputParser ?? new VerifytaOutputParser();
    this.environment = environment ?? new VerifytaEnvironment();
  }

  async verifySolution(
    xmlFile: string,
    queries: string[],
  ): Promise<IQueryResult> {
    const result = await this.environment.execute(xmlFile, queries);
    const parsedResult = this.parser.parse(result, queries);

    return parsedResult;
  }
}
