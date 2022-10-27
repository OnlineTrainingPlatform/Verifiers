import {
  IUseCase,
  IVerifySolutionReponse,
  IVerifySolutionRequest,
  VerifySolutionUsecase,
} from '..';
import { IVerifier, VerifytaResult } from '../../infrastructure';

export class User {
  private readonly verifySolutionUsecase: IUseCase<
    IVerifySolutionRequest,
    IVerifySolutionReponse
  >;

  constructor(verifier: IVerifier) {
    this.verifySolutionUsecase = new VerifySolutionUsecase(verifier);
  }

  public async verifySolution(
    request: IVerifySolutionRequest,
  ): Promise<IVerifySolutionReponse> {
    return this.verifySolutionUsecase.do(request);
  }
}
