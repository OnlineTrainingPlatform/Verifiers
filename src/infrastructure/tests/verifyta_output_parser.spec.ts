import { VerifytaOutputParser } from '../verifyta_output_parser';
import * as testStrings from '../../test_files/test_verifyta_output_strings';
import { VerifytaResult } from '../verifyta_result';

describe('verifyta output parser', () => {
  const parser = new VerifytaOutputParser();

  it('output from verifyta with two queries passing', async () => {
    // Arrange
    const verifytaOutput = testStrings.two_queries_passing;
    const queries = ['query_1', 'query_2'];
    const queriesPassed = new Map<string, boolean>([
      ['query_1', true],
      ['query_2', true],
    ]);

    const expected = new VerifytaResult(queriesPassed, false);

    // Act
    const actual = parser.parse(verifytaOutput, queries);

    //Assert
    expect(actual).toBe(expected);
  });

  it('output from verifyta with no syntax errors and no queries', async () => {
    // Arrange
    const verifytaOutput = testStrings.two_queries_passing;
    const queries = ['query_1', 'query_2'];
    const queriesPassed = new Map<string, boolean>([
      ['query_1', true],
      ['query_2', true],
    ]);

    const expected = new VerifytaResult(queriesPassed, false);

    // Act
    const actual = parser.parse(verifytaOutput, queries);

    //Assert
    expect(actual).toBe(expected);
  });
});
