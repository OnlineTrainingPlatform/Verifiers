import * as testStrings from '../../test_files/test_verifyta_output_strings';
import { VerifytaEnvironment } from '../verifyta_environment';
import * as xmlFiles from '../../test_files/xml_example_files';
import { ICmdResult } from '../i_cmd_result';
import * as fs from 'fs';

describe('verifyta output parser', () => {
  const environment = new VerifytaEnvironment();

  it('returns two queries passing', async () => {
    // Arrange
    const expected = testStrings.two_queries_passing;
    const xmlFile = fs.readFileSync(xmlFiles.xmlfileWithTwoTrueQueries, 'utf8');

    // Act
    const actual = await environment.execute(xmlFile).verifierOutput;

    //Assert
    expect(actual).toBe(expected);
  });

  // it('returns two queries failing', async () => {
  //   // Arrange
  //   const expected = testStrings.two_queries_failing;
  //   const xmlFile = xmlFiles.xmlfileWithTwoFalseQueries;

  //   // Act
  //   const actual = environment.execute(xmlFile);

  //   //Assert
  //   expect(actual).toBe(expected);
  // });

  it('returns one query failing and one passing', async () => {
    // Arrange
    const expected = testStrings.one_query_failing_one_passing;
    const xmlFile = fs.readFileSync(
      xmlFiles.xmlfileWithOneFalseAndOneTrueQuery,
      'utf8',
    );

    // Act
    //const actual = environment.execute(xmlFile);
    const actual = await (await environment.execute(xmlFile)).verifierOutput;

    //Assert
    expect(actual).toBe(expected);
  });

  it('returns syntax error', async () => {
    // Arrange
    const expected = testStrings.one_syntax_error;
    const xmlFile = fs.readFileSync(xmlFiles.xmlFileWithSyntaxErrors, 'utf8');

    // Act
    //const actual = environment.execute(xmlFile);
    const actual = await (await environment.execute(xmlFile)).verifierError;

    //Assert
    expect(actual).toBe(expected);
  });

  it('returns no syntax error', async () => {
    // Arrange
    const expected = testStrings.no_syntax_error;
    const xmlFile = fs.readFileSync(
      xmlFiles.xmlFileWithoutSyntaxErrors,
      'utf8',
    );

    // Act
    //const actual = environment.execute(xmlFile);
    const actual = await (await environment.execute(xmlFile)).verifierOutput;

    //Assert
    expect(actual).toBe(expected);
  });
});
