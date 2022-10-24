import { VerifytaResult } from './VerifytaResult';

export interface IVerifier {
  verifySolution(solution: object): VerifytaResult;
}
