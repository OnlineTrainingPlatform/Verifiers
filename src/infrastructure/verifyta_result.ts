import { IQueryResult } from './i_query_result';

export class VerifytaResult implements IQueryResult {
  private readonly _queriesPassedDict: Map<string, boolean>;
  private readonly _hasSyntaxError: boolean;
  private readonly _hasParserError: boolean;

  constructor(
    dict: Map<string, boolean>,
    hasSyntaxError: boolean,
    hasParserError: boolean,
  ) {
    this._queriesPassedDict = dict;
    this._hasSyntaxError = hasSyntaxError;
    this._hasParserError = hasParserError;
  }

  get passedQueriesResults(): Map<string, boolean> {
    return this._queriesPassedDict;
  }

  get hasSyntaxError(): boolean {
    return this._hasSyntaxError;
  }

  get hasParserError(): boolean {
    return this._hasParserError;
  }
}
