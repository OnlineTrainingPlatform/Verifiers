export class QueryExtractor {
  private readonly xml_file;

  constructor(xml_file: string) {
    this.xml_file = xml_file;
  }

  extract(): Array<string> {
    throw Error('Not implemented!');
  }
}
