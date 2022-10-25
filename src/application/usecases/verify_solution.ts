import { IUseCase } from './i_use_case';
import { VerifytaResult, IVerifier } from '../../infrastructure';

export interface IVerifySolutionRequest {
  xmlFile: string;
}
// export interface IVerifySolutionReponse {
//   result: VerifytaResult
// }

export class VerifySolutionUsecase
  implements IUseCase<IVerifySolutionRequest, VerifytaResult>
{
  private readonly verifier: IVerifier;

  constructor(verifier: IVerifier) {
    this.verifier = verifier;
  }

  public async do(request: IVerifySolutionRequest): Promise<VerifytaResult> {
    return await this.verifier.verifySolution(request.xmlFile);
  }
}
