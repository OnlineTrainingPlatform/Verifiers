import {
  IUseCase,
  IVerifySolutionReponse,
  IVerifySolutionRequest,
  VerifySolutionUsecase,
} from '..';
import { IQueryVerifier } from '../../infrastructure';

export class User {
  private readonly verifySolutionUsecase: IUseCase<
    IVerifySolutionRequest,
    IVerifySolutionReponse
  >;

  constructor(verifier: IQueryVerifier) {
    this.verifySolutionUsecase = new VerifySolutionUsecase(verifier);
  }

  public async verifySolution(
    request: IVerifySolutionRequest,
  ): Promise<IVerifySolutionReponse> {
    return this.verifySolutionUsecase.do(request);
  }
}
