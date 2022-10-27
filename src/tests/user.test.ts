import { describe, expect, test } from '@jest/globals';
import { User } from '../application';
import { UPPAALenvironment, VerifytaOutputParser, VerifytaResult, VerifytaVerifier } from '../infrastructure';
import * as xmlFiles from './xmlExampleFiles';
import {IVerifySolutionRequest} from '../application/usecases'

describe("Verifyta result", () => {
    const verifier = new VerifytaVerifier(new VerifytaOutputParser, new UPPAALenvironment)
    const user = new User(verifier);

    it("hasSyntaxErrors=true when given an XML with syntax errors", async () => {
        // Arrange
        const xml_input = xmlFiles.xmlFileWithSyntaxErrors as string;

        // Act
        const response = await user.verifySolution({xmlFile: xml_input});

        //Assert
        expect(response.result.hasSyntaxErrors).toBe(true);
    });

    it("hasSyntaxErrors=false when given an XML without syntax errors", async () => {
        // Arrange
        const xml_input = xmlFiles.xmlFileWithoutSyntaxErrors as string;

        // Act
        const response = await user.verifySolution({xmlFile: xml_input});

        // Assert
        expect(response.result.hasSyntaxErrors).toBe(false);
    });

    it("shows two queries passing when given an XML with two queries passing", async () => {
        // Arrange
        const xml_input = xmlFiles.xmlfileWithTwoTrueQuiries as string;

        // Act
        const response = await user.verifySolution({xmlFile: xml_input});

        // Get values
        const queryDict = response.result.queriesPassedDict;
        
        const firstQuery = Array.from(queryDict.keys())[0];
        const firstResult = queryDict.get(firstQuery); 

        const secondQuery = Array.from(queryDict.keys())[1];
        const secondResult = queryDict.get(secondQuery); 

        // Assert
        expect(firstResult && secondResult).toBe(true);
    });

    it("shows two queries failing when given an XML with two queries failing", async () => {
        // Arrange
        const xml_input = xmlFiles.xmlfileWithTwoFalseQuiries as string;

        // Act
        const response = await user.verifySolution({xmlFile: xml_input});

        // Get values
        const queryDict = response.result.queriesPassedDict;
        
        const firstQuery = Array.from(queryDict.keys())[0];
        const firstResult = queryDict.get(firstQuery); 

        const secondQuery = Array.from(queryDict.keys())[1];
        const secondResult = queryDict.get(secondQuery); 

        // Assert
        expect(firstResult).toBe(false);
        expect(secondResult).toBe(false);
    });

    it("shows one query failing and the other passing when given an XML with one failing and passing query", async () => {
        // Arrange
        const xml_input = xmlFiles.xmlfileWithOneFalseAndOneTrueQuiry as string;

        // Act
        const response = await user.verifySolution({xmlFile: xml_input});

        // Get values
        const queryDict = response.result.queriesPassedDict;
        
        const firstQuery = Array.from(queryDict.keys())[0];
        const firstResult = queryDict.get(firstQuery); 

        const secondQuery = Array.from(queryDict.keys())[1];
        const secondResult = queryDict.get(secondQuery); 

        // Assert
        expect(firstResult).toBe(false);
        expect(secondResult).toBe(true);
    });
  });


