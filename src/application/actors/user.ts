import {
  //IVerifySolutionReponse,
  IVerifySolutionRequest,
  VerifySolutionUsecase,
} from '..';
import { IVerifier, VerifytaResult } from '../../infrastructure';

export class User {
  private readonly verifySolutionUsecase: VerifySolutionUsecase;

  constructor(verifier: IVerifier) {
    this.verifySolutionUsecase = new VerifySolutionUsecase(verifier);
  }

  public async verifySolution(
    request: IVerifySolutionRequest,
  ): Promise<VerifytaResult> {
    return this.verifySolutionUsecase.do(request);
  }
}
