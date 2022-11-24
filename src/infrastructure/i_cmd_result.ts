/**
 * The output of a cmd. If there is an XML error (invalid xml or syntax error), the verifier output will be an empty string.
 * If there is no XML error, the verifierError will be an empty string. The cmdError can be undefined,
 * as it will only exist if the cmd throws an error (e.g. invalid xml or syntax error).
 */
export interface ICmdResult {
  verifierOutput: string;
  verifierError: string;
  cmdError?: string;
}
