import { describe, expect, test } from '@jest/globals';
import { User } from '../application';
import { UPPAALenvironment, VerifytaOutputParser, VerifytaResult, VerifytaVerifier } from '../infrastructure';
import * as xmlFiles from './xmlExampleFiles';
import {IVerifySolutionRequest} from '../application/usecases'

describe("Verifyta result", () => {
    const verifier = new VerifytaVerifier(new VerifytaOutputParser, new UPPAALenvironment)
    const user = new User(verifier);

    it("has syntaxError=true when given an XML with syntax errors", async () => {
        const xml_input = xmlFiles.xmlFileWithSyntaxErrors as string;
        const response = await user.verifySolution({xmlFile: xml_input});
        expect(response.result.hasSyntaxErrors).toBe(true);
    });
  });

  
