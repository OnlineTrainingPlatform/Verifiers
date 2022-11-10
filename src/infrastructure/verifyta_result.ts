import { IQueryResult } from './i_query_result';

export class VerifytaResult implements IQueryResult {
  private readonly _queriesPassedDict: Map<string, boolean>;
  private readonly _hasSyntaxErrors: boolean;
  private readonly _hasXmlErrors: boolean;

  constructor(
    dict: Map<string, boolean>,
    hasSyntaxErrors: boolean,
    hasXmlErrors: boolean,
  ) {
    this._queriesPassedDict = dict;
    this._hasSyntaxErrors = hasSyntaxErrors;
    this._hasXmlErrors = hasXmlErrors;
  }

  get passedQueriesResults(): Map<string, boolean> {
    return this._queriesPassedDict;
  }

  get hasSyntaxErrors(): boolean {
    return this._hasSyntaxErrors;
  }

  get hasXmlErrors(): boolean {
    return this._hasXmlErrors;
  }
}
