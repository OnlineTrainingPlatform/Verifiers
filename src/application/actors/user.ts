import {
  IVerifySolutionReponse,
  IVerifySolutionRequest,
  VerifySolutionUsecase,
} from '..';
import { IVerifier } from '../../infrastructure';

export class User {
  private readonly verifySolutionUsecase: VerifySolutionUsecase;

  constructor(verifier: IVerifier) {
    this.verifySolutionUsecase = new VerifySolutionUsecase(verifier);
  }

  public async verifySolution(
    request: IVerifySolutionRequest,
  ): Promise<IVerifySolutionReponse> {
    return this.verifySolutionUsecase.do(request);
  }
}
