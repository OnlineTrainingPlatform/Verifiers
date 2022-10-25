import { VerifytaResult } from './VerifytaResult';

export interface IVerifier {
  verifySolution(solution: string): VerifytaResult;
}
