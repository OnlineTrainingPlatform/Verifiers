import * as testStrings from '../../test_files/test_verifyta_output_strings';
import { VerifytaEnvironment } from '../verifyta_environment';
import * as xmlFiles from '../../test_files/xml_example_files';

describe('verifyta output parser', () => {
  const environment = new VerifytaEnvironment();

  it('output from verifyta with two queries passing', async () => {
    // Arrange
    const expected = testStrings.two_queries_passing;
    const xmlFile = xmlFiles.xmlfileWithTwoTrueQueries;

    // Act
    const actual = environment.execute(xmlFile);

    //Assert
    expect(actual).toBe(expected);
  });
});
