import { IUseCase } from './i_use_case';
import { IVerifier } from '../../domain';

export interface IVerifySolutionRequest {
  xmlFile: string
}
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
    return await this.verifier.verifySolution(request.xmlFile),
} 
}
