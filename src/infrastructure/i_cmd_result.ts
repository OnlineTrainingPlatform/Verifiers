export interface ICmdResult {
  verifierOutput: string; // If there is an XML error, this will be an empty string
  verifierError: string;
  cmdError?: string;
}
