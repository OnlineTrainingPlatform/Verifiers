export class UppaalXmlModelBuilder {
    private xml: string;
    private readonly escap_map: { [mapping: string]: string } = {
        '>': '&gt;',
        '<': '&lt;',
        "'": '&apos;',
        '"': '&quot;',
        '&': '&amp;'
    }

    constructor(xml: string) {
        // Copy the xml as the buildre creates a new xml file
        this.xml = xml
    }

    private escape_xml(xml: string): string {
        for (const mapping in this.escap_map) {
            xml = xml.replace(mapping, this.escap_map[mapping])
        }
        return xml
    }

    private has_queries(): boolean {
        return this.xml.includes("<queries>") && this.xml.includes("</queries>")
    }

    private has_a_query(): boolean {
        return this.xml.includes("<query>")
    }

    public remove_all_query_tags(): UppaalXmlModelBuilder {
        // If we dont have either an opening or closing tag then return
        if (!this.has_queries()) {
            return this;
        }

        // If we dont have a "query" then the "queries" are empty
        if (!this.has_a_query()) {
            return this;
        }

        // The index are of the first character: '<'
        const queries_opening_tag_index = this.xml.indexOf("<queries>");
        const queries_closing_tag_index = this.xml.indexOf("</queries>");

        // Index of the first character after ">"
        const start_index = queries_opening_tag_index + "<queries>".length - 1;
        // The first character before "<"
        const end_index = queries_closing_tag_index - 1;

        // Uses clise to "cut away" the "query" tags in "queries"
        const start_string = this.xml.slice(0, start_index);
        const end_string = this.xml.slice(end_index, this.xml.length);

        this.xml = start_string + end_string;

        return this
    }

    public add_query_tag(query: string, comment: string | undefined = undefined): UppaalXmlModelBuilder {
        query = this.escape_xml(query);
        if (!comment) {
            comment = ""
        } else {
            comment = this.escape_xml(comment);
        }

        let query_tag = `<query><formula>${query}</formula><comment>${comment}</comment></query>`
        if (!this.has_queries()) {
            query_tag = `<queries>${query_tag}</queries>`
        }

        // The index are of the first character: '<'
        const end_index = this.has_queries() ? this.xml.indexOf("</queries>") : this.xml.indexOf("</nta>")

        // Uses clise to "cut away" the "query" tags in "queries"
        const start_string = this.xml.slice(0, end_index);
        const end_string = this.xml.slice(end_index, this.xml.length);

        this.xml = start_string + query_tag + end_string

        return this;
    }

    public build(): string {
        return this.xml
    }
}