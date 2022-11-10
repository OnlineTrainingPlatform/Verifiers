export interface IQueryResult {
  hasSyntaxError: boolean;
  hasParserError: boolean;
  passedQueriesResults: Map<string, boolean>;
}
