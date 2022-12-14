import { VerifytaEnvironment } from '../verifyta_environment';
import * as xmlFiles from '../../test_files/xml_example_files';
import * as fs from 'fs';

describe('verifyta output parser', () => {
  const environment = new VerifytaEnvironment();

  it(
    'returns two queries passing',
    async () => {
      //Arrange
      const expected_strings = [
        'Verifying formula 1 at /nta/queries/query[1]/formula',
        'Formula is satisfied.',
        'Verifying formula 2 at /nta/queries/query[2]/formula',
        'Formula is satisfied.',
      ];
      const xmlFile = fs.readFileSync(
        xmlFiles.xmlfileWithTwoTrueQueries,
        'utf8',
      );
      const expected_string_index = 4; //Will be four if all four strings are found

      //Act
      const cmdOutput = await (
        await environment.execute(xmlFile)
      ).verifierOutput;
      const cmdArray = cmdOutput.split('\n');
      let actual_string_index = 0;

      //Output from Verifyta kan be split by \n. The for-loop is used to check that the expected strings are also
      //in the right order.
      for (let i = 0; i < cmdArray.length; i++) {
        if (cmdArray[i].includes(expected_strings[actual_string_index])) {
          actual_string_index++;
        }
      }

      //Assert
      expect(actual_string_index).toBe(expected_string_index);
    },
    1000 * 90,
  );

  it(
    'returns two queries failing',
    async () => {
      //Arrange
      const expected_strings = [
        'Verifying formula 1 at /nta/queries/query[1]/formula',
        'Formula is NOT satisfied.',
        'Verifying formula 2 at /nta/queries/query[2]/formula',
        'Formula is NOT satisfied.',
      ];
      const xmlFile = fs.readFileSync(
        xmlFiles.xmlfileWithTwoFalseQueries,
        'utf8',
      );
      const expected_string_index = 4; //Will be four if all four strings are found

      //Act
      const cmdOutput = await (
        await environment.execute(xmlFile)
      ).verifierOutput;
      const cmdArray = cmdOutput.split('\n');
      let actual_string_index = 0;

      //Output from Verifyta kan be split by \n. The for-loop is used to check that the expected strings are also
      //in the right order.
      for (let i = 0; i < cmdArray.length; i++) {
        if (cmdArray[i].includes(expected_strings[actual_string_index])) {
          actual_string_index++;
        }
      }

      //Assert
      expect(actual_string_index).toBe(expected_string_index);
    },
    1000 * 90,
  );

  it('returns one query failing and one passing', async () => {
    //Arrange
    const expected_strings = [
      'Verifying formula 1 at /nta/queries/query[1]/formula',
      'Formula is NOT satisfied.',
      'Verifying formula 2 at /nta/queries/query[2]/formula',
      'Formula is satisfied.',
    ];
    const xmlFile = fs.readFileSync(
      xmlFiles.xmlfileWithOneFalseAndOneTrueQuery,
      'utf8',
    );
    const expected_string_index = 4; //Will be four if all four strings are found

    //Act
    const cmdOutput = await (await environment.execute(xmlFile)).verifierOutput;
    const cmdArray = cmdOutput.split('\n');
    let actual_string_index = 0;

    //Output from Verifyta kan be split by \n. The for-loop is used to check that the expected strings are also
    //in the right order.
    for (let i = 0; i < cmdArray.length; i++) {
      if (cmdArray[i].includes(expected_strings[actual_string_index])) {
        actual_string_index++;
      }
    }

    //Assert
    expect(actual_string_index).toBe(expected_string_index);
  });

  it('returns syntax error', async () => {
    // Arrange
    const expected_string =
      "[error] syntax error: unexpected T_ID, expecting ':'.";
    const xmlFile = fs.readFileSync(xmlFiles.xmlFileWithSyntaxErrors, 'utf8');
    const expected = true;

    // Act
    const cmdOutput = await environment.execute(xmlFile);
    const actual = cmdOutput.verifierError.includes(expected_string);

    //Assert
    expect(actual).toBe(expected);
  });

  it('returns no syntax error', async () => {
    //Arrange
    const expected_strings = [
      'Options for the verification:',
      'Generating no trace',
      'Search order is breadth first',
      'Using conservative space optimisation',
    ];
    const xmlFile = fs.readFileSync(
      xmlFiles.xmlFileWithoutSyntaxErrors,
      'utf8',
    );
    const expected_string_index = 4; //Will be four if all four strings are found

    //Act
    const cmdOutput = await (await environment.execute(xmlFile)).verifierOutput;
    const cmdArray = cmdOutput.split('\n');
    let actual_string_index = 0;

    //Output from Verifyta kan be split by \n. The for-loop is used to check that the expected strings are also
    //in the right order.
    for (let i = 0; i < cmdArray.length; i++) {
      if (cmdArray[i].includes(expected_strings[actual_string_index])) {
        actual_string_index++;
      }
    }

    //Assert
    expect(actual_string_index).toBe(expected_string_index);
  });

  it('returns verifierOutput = "" when verifing an invalid xml', async () => {
    //Arrange
    const xmlFile = fs.readFileSync(xmlFiles.xmlFileInvalidXML, 'utf8');
    const expected = '';

    //Act
    const actual = (await environment.execute(xmlFile)).verifierOutput;

    //Assert
    expect(actual).toBe(expected);
  });

  it('has verifierError with parser error when verifing an invalid xml', async () => {
    //Arrange
    const xmlFile = fs.readFileSync(xmlFiles.xmlFileInvalidXML, 'utf8');
    const expected = true;

    //Act
    const verifierError = (await environment.execute(xmlFile)).verifierError;
    const actual = verifierError.includes('parser error');

    //Assert
    expect(actual).toBe(expected);
  });

  it('has verifierError with syntax error when verifing an xml with syntax errors', async () => {
    //Arrange
    const xmlFile = fs.readFileSync(xmlFiles.xmlFileWithSyntaxErrors, 'utf8');
    const expected = true;

    //Act
    const verifierError = (await environment.execute(xmlFile)).verifierError;
    const actual = verifierError.includes('syntax error');

    //Assert
    expect(actual).toBe(expected);
  });

  it('returns verifierError = "" when verifing a valid xml', async () => {
    //Arrange
    const xmlFile = fs.readFileSync(
      xmlFiles.xmlFileWithoutSyntaxErrors,
      'utf8',
    );
    const expected = '';

    //Act
    const actual = (await environment.execute(xmlFile)).verifierError;

    //Assert
    expect(actual).toBe(expected);
  });

  it('returns cmdError = undefined when verifing a valid xml', async () => {
    //Arrange
    const xmlFile = fs.readFileSync(
      xmlFiles.xmlFileWithoutSyntaxErrors,
      'utf8',
    );
    const expected = undefined;

    //Act
    const actual = (await environment.execute(xmlFile)).cmdError;

    //Assert
    expect(actual).toBe(expected);
  });
});
