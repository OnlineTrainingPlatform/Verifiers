import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../application';
import {
  UPPAALenvironment,
  VerifytaOutputParser,
  VerifytaVerifier,
} from '../infrastructure';

export async function verifierController(
  fastify: FastifyInstance,
  opts: any,
): Promise<void> {
  fastify.post(
    '/verifiers/verifyta',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const verifier = new VerifytaVerifier(
        new VerifytaOutputParser(),
        new UPPAALenvironment(),
      );
      const user = new User(verifier);
      const xml_input: string = request.body as string;
      const response = await user.verifySolution({xmlFile: xml_input})
      reply.send(response);
    },
  );
}
