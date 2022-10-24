import { IVerifier } from "./IVerifier";
import { VerifytaResult } from "./VerifytaResult";

export class VerifytaVerifier implements IVerifier {
    verifySolution(solution: object): VerifytaResult {
        throw new Error("Method not implemented.");
    }
}
