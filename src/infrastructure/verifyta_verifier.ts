import { IQueryVerifier } from './i_query_verifier';
import { VerifytaOutputParser } from './verifyta_output_parser';
import { VerifytaEnvironment } from './verifyta_environment';
import { IQueryResult } from './i_query_result';
import { UppaalXmlModelBuilder } from './uppaal_xml_model_builder';

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

  /**
   * Verify an xml solution with input queries
   * @param xmlFile
   * @param queries
   * @returns result of verification
   */
  async verifySolution(
    xmlFile: string,
    queries: Array<string>,
  ): Promise<IQueryResult> {
    const uppaal_model_builder = new UppaalXmlModelBuilder(
      xmlFile,
    ).remove_all_query_tags();
    for (const query of queries) {
      uppaal_model_builder.add_query_tag(query);
    }
    xmlFile = uppaal_model_builder.build();

    const result = await this.environment.execute(xmlFile);

    return this.parser.parse(result, queries);
  }
}
