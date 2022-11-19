import { describe, expect } from '@jest/globals';
import { UppaalXmlModelBuilder } from './uppaal_xml_model_builder'

describe("UppaalXmlModelBuilder", () => {
    describe("remove_all_query_tags", () => {
        it("Should remove the contents of the 'queries' tag", () => {
            // Arrange
            const model = "<nta><queries><query><formula>A[] Switch.x</formula><comment></comment></query></queries></nta>"
            const builder = new UppaalXmlModelBuilder(model);
            const expected = "<nta><queries></queries></nta>"

            // Act
            const actual = builder
                .remove_all_query_tags()
                .build();

            // Assert
            expect(actual).toEqual(expected);
        })
    })
    describe("add_query_tag", () => {
        it('Should add a query to a model without "queries" tag', () => {
            // Arrange
            const model = "<nta></nta>"
            const builder = new UppaalXmlModelBuilder(model);
            const expected = "<nta><queries><query><formula>A[] Switch.x</formula><comment></comment></query></queries></nta>"

            // Act
            const actual = builder
                .add_query_tag("A[] Switch.x")
                .build();

            // Assert
            expect(actual).toEqual(expected);
        })
        it('Should add a query with a comment to a model without "queries" tag', () => {
            // Arrange
            const model = "<nta></nta>"
            const builder = new UppaalXmlModelBuilder(model);
            const expected = "<nta><queries><query><formula>A[] Switch.x</formula><comment>hello world</comment></query></queries></nta>"

            // Act
            const actual = builder
                .add_query_tag("A[] Switch.x", "hello world")
                .build();

            // Assert
            expect(actual).toEqual(expected);
        })
        it('Should add a query to a model without "queries" tag', () => {
            // Arrange
            const model = "<nta><queries></queries></nta>"
            const builder = new UppaalXmlModelBuilder(model);
            const expected = "<nta><queries><query><formula>A[] Switch.x</formula><comment></comment></query></queries></nta>"

            // Act
            const actual = builder
                .add_query_tag("A[] Switch.x")
                .build();

            // Assert
            expect(actual).toEqual(expected);
        })
        it('Should add a query with a comment to a model without "queries" tag', () => {
            // Arrange
            const model = "<nta><queries></queries></nta>"
            const builder = new UppaalXmlModelBuilder(model);
            const expected = "<nta><queries><query><formula>A[] Switch.x</formula><comment>hello world</comment></query></queries></nta>"

            // Act
            const actual = builder
                .add_query_tag("A[] Switch.x", "hello world")
                .build();

            // Assert
            expect(actual).toEqual(expected);
        })
        it('Should add a query with charcaters to escape to a model without "queries" tag', () => {
            // Arrange
            const model = "<nta></nta>"
            const builder = new UppaalXmlModelBuilder(model);
            const expected = "<nta><queries><query><formula>A[] Switch.x &amp; &gt; &lt; &apos; &quot;</formula><comment></comment></query></queries></nta>"

            // Act
            const actual = builder
                .add_query_tag("A[] Switch.x & > < ' " + '"')
                .build();

            // Assert
            expect(actual).toEqual(expected);
        })
        it('Should add a query with charcaters to escape with a comment to a model without "queries" tag', () => {
            // Arrange
            const model = "<nta></nta>"
            const builder = new UppaalXmlModelBuilder(model);
            const expected = "<nta><queries><query><formula>A[] Switch.x &amp; &gt; &lt; &apos; &quot;</formula><comment>hello world</comment></query></queries></nta>"

            // Act
            const actual = builder
                .add_query_tag("A[] Switch.x & > < ' " + '"', "hello world")
                .build();

            // Assert
            expect(actual).toEqual(expected);
        })
        it('Should add a query with charcaters to escape to a model without "queries" tag', () => {
            // Arrange
            const model = "<nta><queries></queries></nta>"
            const builder = new UppaalXmlModelBuilder(model);
            const expected = "<nta><queries><query><formula>A[] Switch.x &amp; &gt; &lt; &apos; &quot;</formula><comment></comment></query></queries></nta>"

            // Act
            const actual = builder
                .add_query_tag("A[] Switch.x & > < ' " + '"')
                .build();

            // Assert
            expect(actual).toEqual(expected);
        })
        it('Should add a query with charcaters to escape with a comment to a model without "queries" tag', () => {
            // Arrange
            const model = "<nta><queries></queries></nta>"
            const builder = new UppaalXmlModelBuilder(model);
            const expected = "<nta><queries><query><formula>A[] Switch.x &amp; &gt; &lt; &apos; &quot;</formula><comment>hello world</comment></query></queries></nta>"

            // Act
            const actual = builder
                .add_query_tag("A[] Switch.x & > < ' " + '"', "hello world")
                .build();

            // Assert
            expect(actual).toEqual(expected);
        })
        it('Should add a query with charcaters to escape with a comment to a model without "queries" tag', () => {
            // Arrange
            const model = "<nta><queries></queries></nta>"
            const builder = new UppaalXmlModelBuilder(model);
            const expected = "<nta><queries><query><formula>A[] Switch.x &amp; &gt; &lt; &apos; &quot;</formula><comment>hello world &amp; &gt; &lt; &apos; &quot;</comment></query></queries></nta>"

            // Act
            const actual = builder
                .add_query_tag("A[] Switch.x & > < ' " + '"', "hello world & > < ' " + '"')
                .build();

            // Assert
            expect(actual).toEqual(expected);
        })
        it('Should add a query with charcaters to escape with a comment to a model without "queries" tag', () => {
            // Arrange
            const model = "<nta></nta>"
            const builder = new UppaalXmlModelBuilder(model);
            const expected = "<nta><queries><query><formula>A[] Switch.x &amp; &gt; &lt; &apos; &quot;</formula><comment>hello world &amp; &gt; &lt; &apos; &quot;</comment></query></queries></nta>"

            // Act
            const actual = builder
                .add_query_tag("A[] Switch.x & > < ' " + '"', "hello world & > < ' " + '"')
                .build();

            // Assert
            expect(actual).toEqual(expected);
        })
    })
})