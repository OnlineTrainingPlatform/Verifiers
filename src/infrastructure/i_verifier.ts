import { VerifytaResult } from './verifyta_result';

export interface IVerifier {
  verifySolution(solution: string): VerifytaResult;
}
