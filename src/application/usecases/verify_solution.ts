import { IUseCase } from './i_use_case';
import { IQueryVerifier } from '../../infrastructure';
import {IQueryResult} from '../../infrastructure/i_query_result';

export interface IVerifySolutionRequest {
  xmlFile: string;
  queries: Array<string>;
}

export interface IVerifySolutionReponse {
  result: IQueryResult;
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
    const verifytaResult = await this.verifier.verifySolution(request.xmlFile, request.queries);
    const result = {result: verifytaResult};
    return Promise.resolve(result);
  }
}
