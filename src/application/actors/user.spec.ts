import { describe, expect } from '@jest/globals';
import { User } from '..';
import {
  VerifytaEnvironment,
  VerifytaOutputParser,
  VerifytaVerifier,
} from '../../infrastructure';
import * as xmlFiles from '../../test_files/xml_example_files';
import * as fs from 'fs';

describe('Verifyta result', () => {
  const verifier = new VerifytaVerifier(
    new VerifytaOutputParser(),
    new VerifytaEnvironment(),
  );
  const user = new User(verifier);

  it('hasSyntaxError=true when given an XML with syntax errors', async () => {
    // Arrange
    const xml_input = fs.readFileSync(xmlFiles.xmlFileWithSyntaxErrors, 'utf8');

    // Act
    const response = await user.verifySolution({
      xmlFile: xml_input,
      queries: [],
    });

    //Assert
    expect(response.result.hasSyntaxError).toBe(true);
  });

  it('hasSyntaxError=false when given an XML without syntax errors', async () => {
    // Arrange
    const xml_input = fs.readFileSync(
      xmlFiles.xmlFileWithoutSyntaxErrors,
      'utf8',
    );

    // Act
    const response = await user.verifySolution({
      xmlFile: xml_input,
      queries: [],
    });

    // Assert
    expect(response.result.hasSyntaxError).toBe(false);
  });

  it('shows two queries passing when given an XML with two queries passing', async () => {
    // Arrange
    const xml_input = fs.readFileSync(
      xmlFiles.xmlfileWithTwoTrueQueries,
      'utf8',
    );

    // Act
    const response = await user.verifySolution({
      xmlFile: xml_input,
      queries: ['A[] Switch.x < 4', 'A[] Switch.x < 10'],
    });

    // Get values
    const queryDict = response.result.passedQueriesResults;

    const firstQuery = Array.from(queryDict.keys())[0];
    const firstResult = queryDict.get(firstQuery);

    const secondQuery = Array.from(queryDict.keys())[1];
    const secondResult = queryDict.get(secondQuery);

    // Assert
    expect(firstResult && secondResult).toBe(true);
  });

  it('shows two queries failing when given an XML with two queries failing', async () => {
    // Arrange
    const xml_input = fs.readFileSync(
      xmlFiles.xmlfileWithTwoFalseQueries,
      'utf8',
    );

    // Act
    const response = await user.verifySolution({
      xmlFile: xml_input,
      queries: ['A[] deadlock', 'A[] Switch.x < 3'],
    });

    // Get values
    const queryDict = response.result.passedQueriesResults;

    const firstQuery = Array.from(queryDict.keys())[0];
    const firstResult = queryDict.get(firstQuery);

    const secondQuery = Array.from(queryDict.keys())[1];
    const secondResult = queryDict.get(secondQuery);

    // Assert
    expect(firstResult).toBe(false);
    expect(secondResult).toBe(false);
  });

  it('shows one query failing and the other passing when given an XML with one failing and passing query', async () => {
    // Arrange
    const xml_input = fs.readFileSync(
      xmlFiles.xmlfileWithOneFalseAndOneTrueQuery,
      'utf8',
    );

    // Act
    const response = await user.verifySolution({
      xmlFile: xml_input,
      queries: ['A[] deadlock', 'A[] not deadlock'],
    });

    // Get values
    const queryDict = response.result.passedQueriesResults;

    const firstQuery = Array.from(queryDict.keys())[0];
    const firstResult = queryDict.get(firstQuery);

    const secondQuery = Array.from(queryDict.keys())[1];
    const secondResult = queryDict.get(secondQuery);

    // Assert
    expect(firstResult).toBe(false);
    expect(secondResult).toBe(true);
  });
});
