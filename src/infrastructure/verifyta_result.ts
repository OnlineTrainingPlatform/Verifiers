import { IQueryResult } from './i_query_result';

export class VerifytaResult implements IQueryResult {
  private readonly _queriesPassedDict: Map<string, boolean>;
  private readonly _hasSyntaxErrors: boolean;

  constructor(dict: Map<string, boolean>, hasSyntaxErrors: boolean) {
    this._queriesPassedDict = dict;
    this._hasSyntaxErrors = hasSyntaxErrors;
  }

  get passedQueriesResults(): Map<string, boolean> {
    return this._queriesPassedDict;
  }

  get hasSyntaxErrors(): boolean {
    return this._hasSyntaxErrors;
  }
}
