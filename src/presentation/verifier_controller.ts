import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../application';
import {
  VerifytaEnvironment,
  VerifytaOutputParser,
  VerifytaVerifier,
} from '../infrastructure';
import { QueryExtractor } from '../infrastructure/query_extractor';

interface VerifyRequest {
  solution: string;
  queries: object[]; // Map<string, string>;
}

function parseQueries(queries: object[]) {
  const arr: string[] = [];
  for (const obj of queries) {
    arr.push(Object.values(obj)[0] as string);
  }
  return arr;
}

export async function verifierController(
  fastify: FastifyInstance,
  opts: any,
): Promise<void> {
  fastify.post(
    '/verifiers/verifyta',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const verifier = new VerifytaVerifier(
        new VerifytaOutputParser(),
        new VerifytaEnvironment(),
      );
      const user = new User(verifier);
      const body = request.body as VerifyRequest;
      const xmlInput = body.solution;
      const queries = parseQueries(body.queries);

      const result = await user.verifySolution({
        xmlFile: xmlInput,
        queries: queries,
      });

      const response = {
        queryResults: Object.fromEntries(result.result.passedQueriesResults),
        hasSyntaxError: result.result.hasSyntaxErrors,
      };
      reply.send(response);
    },
  );
}
