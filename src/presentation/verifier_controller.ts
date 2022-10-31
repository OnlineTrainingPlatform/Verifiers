import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../application';
import {
  VerifytaEnvironment,
  VerifytaOutputParser,
  VerifytaVerifier,
} from '../infrastructure';
import { QueryExtractor } from '../infrastructure/query_extractor';

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
      const xml_input: string = request.body as string;
      const queries = new QueryExtractor().extract(xml_input);
      const response = await user.verifySolution({
        xmlFile: xml_input,
        queries: queries,
      });
      reply.send(response);
    },
  );
}
