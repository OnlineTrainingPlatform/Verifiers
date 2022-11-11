import { verifytaTestModelsPath } from "../infrastructure";

// Syntax errors
export const xmlFileWithSyntaxErrors = verifytaTestModelsPath("lightswitch_syntaxError");
export const xmlFileWithoutSyntaxErrors = verifytaTestModelsPath("lightswitch_noSyntaxError");

// Other errors
export const xmlFileInvalidXML = verifytaTestModelsPath("lightswitch_twoQueriesPassing_XML_ERROR");

// Queries
export const xmlfileWithTwoTrueQueries = verifytaTestModelsPath("lightswitch_twoQueriesPassing");
export const xmlfileWithTwoFalseQueries = verifytaTestModelsPath("lightswitch_twoQueriesFailing");
export const xmlfileWithOneFalseAndOneTrueQuery = verifytaTestModelsPath("lightswitch_oneQueriesFailingOnePassing");