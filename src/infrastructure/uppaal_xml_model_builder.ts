import Os from 'os';

export class UppaalXmlModelBuilder {
  private xml: string;

  constructor(xml: string) {
    // Copy the xml as the builder creates a new xml file.
    this.xml = xml;
  }

  /**
   * When inserting at query in uppaal, it's necessary to escape certain characters, to adhere to xml conventions.
   * @param xml
   * @returns the xml in correct uppaal format.
   */
  private escape_xml(xml: string): string {
    xml = xml.replace('&', '&amp;');
    xml = xml.replace('>', '&gt;');
    xml = xml.replace('<', '&lt;');
    xml = xml.replace("'", '&apos;');
    xml = xml.replace('"', '&quot;');
    return xml;
  }

  /**
   * Function to check whether an xml file contains multiple queries.
   * @returns
   */
  private has_queries(): boolean {
    return this.xml.includes('<queries>') && this.xml.includes('</queries>');
  }

  /**
   * Function to check whether an xml file contains at least a single query.
   * @returns
   */
  private has_a_query(): boolean {
    return this.xml.includes('<query>');
  }

  /**
   * Remove all <query></query> tags (and what's inside them).
   * @returns xml without "query" tags
   */
  public remove_all_query_tags(): UppaalXmlModelBuilder {
    // If we dont have either an opening or closing "queries" tag then return
    if (!this.has_queries()) {
      return this;
    }

    // If we dont have a "query" tag then the "queries" tag is empty
    if (!this.has_a_query()) {
      return this;
    }

    // The index are of the first character: '<'
    const queries_opening_tag_index = this.xml.indexOf('<queries>');
    const queries_closing_tag_index = this.xml.indexOf('</queries>');

    // Index of the first character after ">"
    let start_index = queries_opening_tag_index + '<queries>'.length;
    // The first character before "<"
    const end_index = queries_closing_tag_index - 1;

    // If the start index is either a "\n", "\r" or "\t", then a new index must be calculated.
    const start_char = this.xml.charAt(start_index);
    start_index = this.IndexAfterStartChar(start_index, start_char);

    // Uses slice to "cut away" the "query" tags in "queries"
    const start_string = this.xml.slice(0, start_index);
    const end_string = this.xml.slice(end_index, this.xml.length);

    this.xml = start_string + end_string;

    return this;
  }

  /**
   * Get start index - start index will only be affected if start char is \n, \t or \r.
   * @param start_index
   * @param start_char
   * @returns start index
   */
  public IndexAfterStartChar(start_index: number, start_char: string): number {
    if (Os.platform() === 'linux') {
      if (start_char === '\t' || start_char === '\n') {
        start_index += 1;
      } else {
        start_index -= 1;
      }
    } else {
      // Windows
      if (start_char === '\t' || start_char === '\n') {
        start_index += 1;
      } else if (start_char === '\r') {
        start_index += 2;
      } else {
        start_index -= 1;
      }
    }

    return start_index;
  }

  /**
   * Add "query" tag, query and comment to xml file.
   * @param query
   * @param comment
   * @returns
   */
  public add_query_tag(
    query: string,
    comment: string | undefined = undefined,
  ): UppaalXmlModelBuilder {
    query = this.escape_xml(query);
    if (!comment) {
      comment = '';
    } else {
      comment = this.escape_xml(comment);
    }

    let query_tag = `<query><formula>${query}</formula><comment>${comment}</comment></query>`;
    if (!this.has_queries()) {
      query_tag = `<queries>${query_tag}</queries>`;
    }

    // The index are of the first character: '<'
    const end_index = this.has_queries()
      ? this.xml.indexOf('</queries>')
      : this.xml.indexOf('</nta>');

    // Uses slice to "cut away" the "query" tags in "queries"
    const start_string = this.xml.slice(0, end_index);
    const end_string = this.xml.slice(end_index, this.xml.length);

    //Insert query.
    this.xml = start_string + query_tag + end_string;

    return this;
  }

  public build(): string {
    return this.xml;
  }
}
