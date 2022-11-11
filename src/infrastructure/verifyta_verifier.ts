import { IQueryVerifier } from './i_query_verifier';
import { VerifytaOutputParser } from './verifyta_output_parser';
import { VerifytaEnvironment } from './verifyta_environment';
import { IQueryResult } from './i_query_result';

export class VerifytaVerifier implements IQueryVerifier {
  private readonly parser: VerifytaOutputParser;
  private readonly environment: VerifytaEnvironment;

  constructor(
    verifytaOutputParser: VerifytaOutputParser,
    environment: VerifytaEnvironment,
  ) {
    this.parser = verifytaOutputParser;
    this.environment = environment;
  }

  async verifySolution(
    xmlFile: string,
    queries: Array<string>,
  ): Promise<IQueryResult> {
    const result = await this.environment.execute(xmlFile);
    const parsedResult = this.parser.parse(result, queries);

    return parsedResult;
  }
}
