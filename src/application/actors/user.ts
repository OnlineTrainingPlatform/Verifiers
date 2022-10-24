import { VerifySolutionUsecase } from '..';
//import { IExerciseRepository } from '../../domain';

export class User {
  private readonly verifySolution: VerifySolutionUsecase;

  constructor(verifier: IVerifier) {
    this.verifySolution = new VerifySolutionUsecase(verifier);
  }

  public async verifySolution(
    request: IVerifySolutionRequest,
  ): Promise<IVerifySolutionReponse> {
    return this.verifySolution.do(request);
  }
}
