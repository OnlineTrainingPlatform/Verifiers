import { describe, expect } from '@jest/globals';
import fastify from 'fastify';
import { verifierController } from '.';
import * as xmlFiles from '../test_files/xml_example_files';
import * as fs from 'fs';
import { IQueryResult } from '../infrastructure/i_query_result';

describe('/verifier/verifyta', () => {
  const server = fastify();
  server.register(verifierController);
  it('Returns status 400 if there is no xml string in request body', async () => {
    // Arrange
    const expectedResponseCode = 400;

    // Act
    const response = await server.inject({
      method: 'post',
      url: `/verifiers/verifyta`,
      payload: {
        queries: [
          {
            query_1: 'E<> Proc.F',
          },
          {
            query_2: 'E<> Proc.E',
          },
          {
            query_3: 'E<> Proc.D',
          },
        ],
      },
    });

    // Assert
    expect(response.statusCode).toBe(expectedResponseCode);
  });

  it('Returns status 200 and hasParserError = true if the request body contains an invalid xml string', async () => {
    // Arrange
    const expectedResponseCode = 200;
    const xmlFile = fs.readFileSync(xmlFiles.xmlFileInvalidXML, 'utf8');

    // Act
    const response = await server.inject({
      method: 'post',
      url: `/verifiers/verifyta`,
      payload: {
        solution: xmlFile,
        queries: [],
      },
    });
    const payload = JSON.parse(response.payload) as IQueryResult;

    // Assert
    expect(response.statusCode).toBe(expectedResponseCode);
    expect(payload.hasParserError).toBe(true);
  });

  it('Returns status 200 and hasSyntaxError = true if the request body contains an xml string with syntax error', async () => {
    // Arrange
    const expectedResponseCode = 200;
    const xmlFile = fs.readFileSync(xmlFiles.xmlFileWithSyntaxErrors, 'utf8');

    // Act
    const response = await server.inject({
      method: 'post',
      url: `/verifiers/verifyta`,
      payload: {
        solution: xmlFile,
        queries: [],
      },
    });
    const payload = JSON.parse(response.payload) as IQueryResult;

    // Assert
    expect(response.statusCode).toBe(expectedResponseCode);
    expect(payload.hasSyntaxError).toBe(true);
  });

  it('Returns status 404 if invalid verifier is requested', async () => {
    // Arrange
    const expectedResponseCode = 404;
    const xmlFile = fs.readFileSync(xmlFiles.xmlfileWithTwoTrueQueries, 'utf8');

    // Act
    const response = await server.inject({
      method: 'post',
      url: `/verifiers/UPPAAL`,
      payload: {
        solution: xmlFile,
      },
    });

    // Assert
    expect(response.statusCode).toBe(expectedResponseCode);
  });

  it('Returns status 200 if the request body contains a valid xml string', async () => {
    // Arrange
    const expectedResponseCode = 200;
    const xmlFile = fs.readFileSync(xmlFiles.xmlfileWithTwoTrueQueries, 'utf8');
    // Must be object, as we send an object in the controller
    const result: { [query: string]: boolean } = {
      'A[] Switch.x < 4': true,
      'A[] Switch.x < 10': true,
    };

    const expectedResponseBody = {
      queryResults: result,
      hasSyntaxError: false,
      hasParserError: false,
    };

    // Act
    const response = await server.inject({
      method: 'post',
      url: `/verifiers/verifyta`,
      payload: {
        solution: xmlFile,
        queries: [
          {
            query_1: 'A[] Switch.x < 4',
          },
          {
            query_2: 'A[] Switch.x < 10',
          },
        ],
      },
    });
    const payload = JSON.parse(response.payload) as IQueryResult;

    // Assert
    expect(response.statusCode).toBe(expectedResponseCode);
    expect(payload).toEqual(expectedResponseBody); // toEqual instead of toBe, since we have to compare objects
  });
});
