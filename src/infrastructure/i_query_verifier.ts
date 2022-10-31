import { IQueryResult } from './i_query_result';

export interface IQueryVerifier {
  verifySolution(
    solution: string,
    queries: Array<string>,
  ): Promise<IQueryResult>;
}
