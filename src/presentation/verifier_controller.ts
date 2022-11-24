import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../application';
import {
  VerifytaEnvironment,
  VerifytaOutputParser,
  VerifytaVerifier,
} from '../infrastructure';

interface VerifyRequest {
  solution: string;
  queries: object[];
}

/**
 * Converts the queries as object array to array of strings
 * @param queries queries as object array ie.: [{query_1: 'E<> Proc.F'}, ...]
 * @returns the query from each object ie.: ['E<> Proc.F', ...]
 */
function parseQueries(queries: object[]) {
  const arr: string[] = [];
  for (const obj of queries) {
    arr.push(Object.values(obj)[0] as string);
  }
  return arr;
}

/**
 * The controller for the verifier.
 * @param fastify fastify instance
 */
export async function verifierController(
  fastify: FastifyInstance,
): Promise<void> {
  // Endpoint to verify uppaal solution using verifyta
  fastify.post(
    '/verifiers/:verifier',

    async (request: FastifyRequest, reply: FastifyReply) => {
      const { verifier } = request.params as { verifier: string };

      // If something other than verifyta is requested
      if (verifier != 'verifyta') {
        reply.code(404).send('Verifier not found.');
        return;
      }

      const verifyta = new VerifytaVerifier(
        new VerifytaOutputParser(),
        new VerifytaEnvironment(),
      );
      const user = new User(verifyta);
      const body = request.body as VerifyRequest;
      const xmlInput = body.solution;

      // If no xml in body, reply 400
      if (xmlInput == null || xmlInput == '') {
        reply.code(400).send('No xml string in solution field.');
      }

      const queries = parseQueries(body.queries);

      try {
        const result = (
          await user.verifySolution({
            xmlFile: xmlInput,
            queries: queries,
          })
        ).result;

        // construct response that corresponding to swagger doc
        const response = {
          queryResults: Object.fromEntries(result.passedQueriesResults),
          hasSyntaxError: result.hasSyntaxError,
          hasParserError: result.hasParserError,
        };

        reply.code(200).send(response);
      } catch (error) {
        reply.code(500).send(error);
      }
    },
  );
}
