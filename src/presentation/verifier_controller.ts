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
  queries: Map<string, string>;
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
      // const xml_input: string = request.body as string;
      const body = request.body as VerifyRequest;
      const xmlInput = body.solution;
      const queries = Array.from(body.queries.values());
      // const queries = new QueryExtractor().extract(xml_input);
      const response = await user.verifySolution({
        xmlFile: xmlInput,
        queries: queries,
      });
      reply.send(response);
    },
  );
}
