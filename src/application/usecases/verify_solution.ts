import { IUseCase } from './i_use_case';
import { IVerifier } from '../../domain';

export interface IVerifySolutionRequest {}
export interface IVerifySolutionReponse {}

export class VerifySolutionUsecase
  implements IUseCase<IVerifySolutionRequest, IVerifySolutionReponse>
{
  private readonly verifier: IVerifier;

  constructor(verifier: IVerifier) {
    this.verifier = verifier;
  }

  public async do(
    request: IVerifySolutionRequest,
  ): Promise<IVerifySolutionReponse> {
    return {
      exercises: await this.verifier.verifySolution(request),
    };
  }
}
