import { QueryExtractor } from '../query_extractor';
import * as xmlFiles from '../../test_files/xml_example_files';

describe('Query extractor', () => {
    const query_extractor = new QueryExtractor();

  it('returns the correct array', async () => {
    // Arrange
    const xmlFile = xmlFiles.xmlfileWithTwoTrueQueries;
    const expected = ["A[] Switch.x < 4", "A[] Switch.x < 10"]

    // Act
    const actual = query_extractor.extract(xmlFile);

    //Assert
    expect(actual).toBe(expected);
  });

  it('returns the correct array', async () => {
    // Arrange
    const xmlFile = xmlFiles.xmlfileWithTwoFalseQueries;
    const expected = ["A[] deadlock", "A[] Switch.x < 3"]

    // Act
    const actual = query_extractor.extract(xmlFile);

    //Assert
    expect(actual).toBe(expected);
  });
});

