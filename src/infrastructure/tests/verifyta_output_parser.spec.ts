import { VerifytaOutputParser } from '../verifyta_output_parser';
import * as testStrings from '../../test_files/test_verifyta_output_strings';
import { VerifytaResult } from '../verifyta_result';
import { ICmdResult } from '../i_cmd_result';

describe('verifyta output parser', () => {
  const parser = new VerifytaOutputParser();

  it('output from verifyta with two queries passing', async () => {
    // Arrange
    const verifytaOutput = testStrings.two_queries_passing;
    const cmdOutput: ICmdResult = {
      verifierOutput: verifytaOutput,
      verifierError: '',
      cmdError: undefined,
    };

    const queries = ['query_1', 'query_2'];
    const queriesPassed = new Map<string, boolean>([
      ['query_1', true],
      ['query_2', true],
    ]);

    const expected = new VerifytaResult(queriesPassed, false, false);

    // Act
    const actual = parser.parse(cmdOutput, queries);

    //Assert
    expect(actual).toStrictEqual(expected);
  });

  it('output from verifyta with no syntax errors and no queries', async () => {
    // Arrange
    const verifytaOutput = testStrings.no_syntax_error;
    const cmdOutput: ICmdResult = {
      verifierOutput: verifytaOutput,
      verifierError: '',
      cmdError: undefined,
    };
    const queries: string[] = [];
    const queriesPassed = new Map<string, boolean>();

    const expected = new VerifytaResult(queriesPassed, false, false);

    // Act
    const actual = parser.parse(cmdOutput, queries);

    //Assert
    expect(actual).toStrictEqual(expected);
  });

  it('output from verifyta with one syntax error', async () => {
    // Arrange
    const verifytaOutput = testStrings.one_syntax_error;
    const cmdOutput: ICmdResult = {
      verifierOutput: '',
      verifierError: verifytaOutput,
      cmdError: verifytaOutput,
    };
    const queries: string[] = [];
    const queriesPassed = new Map<string, boolean>();

    const expected = new VerifytaResult(queriesPassed, true, false);

    // Act
    const actual = parser.parse(cmdOutput, queries);

    //Assert
    expect(actual).toStrictEqual(expected);
  });

  it('has hasParserError=true when verifyta output is from invalid xml', async () => {
    // Arrange
    const verifytaOutput = testStrings.invalid_xml_error;
    const cmdOutput: ICmdResult = {
      verifierOutput: '',
      verifierError: verifytaOutput,
      cmdError: verifytaOutput,
    };
    const queries: string[] = [];
    const queriesPassed = new Map<string, boolean>();

    const expected = new VerifytaResult(queriesPassed, false, true);

    // Act
    const actual = parser.parse(cmdOutput, queries);

    //Assert
    expect(actual).toStrictEqual(expected);
  });

  it('output from verifyta with one query failing and one passing', async () => {
    // Arrange
    const verifytaOutput = testStrings.one_query_failing_one_passing;
    const cmdOutput: ICmdResult = {
      verifierOutput: verifytaOutput,
      verifierError: '',
      cmdError: undefined,
    };

    const queries = ['query_1', 'query_2'];
    const queriesPassed = new Map<string, boolean>([
      ['query_1', false],
      ['query_2', true],
    ]);

    const expected = new VerifytaResult(queriesPassed, false, false);

    // Act
    const actual = parser.parse(cmdOutput, queries);

    //Assert
    expect(actual).toStrictEqual(expected);
  });
});
