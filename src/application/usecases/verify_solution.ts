import { IUseCase } from './i_use_case';
import { VerifytaResult, IQueryVerifier } from '../../infrastructure';

export interface IVerifySolutionRequest {
  xmlFile: string;
  queries: Array<string>;
}

export interface IVerifySolutionReponse {
  result: VerifytaResult;
}

export class VerifySolutionUsecase
  implements IUseCase<IVerifySolutionRequest, IVerifySolutionReponse>
{
  private readonly verifier: IQueryVerifier;

  constructor(verifier: IQueryVerifier) {
    this.verifier = verifier;
  }

  public async do(
    request: IVerifySolutionRequest,
  ): Promise<IVerifySolutionReponse> {
    const result = await this.verifier.verifySolution(request.xmlFile);
    return { result };
  }
}
