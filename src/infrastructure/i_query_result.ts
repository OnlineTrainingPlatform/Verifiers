export interface IQueryResult {
  hasSyntaxErrors: boolean;
  hasXmlErrors: boolean;
  passedQueriesResults: Map<string, boolean>;
}
