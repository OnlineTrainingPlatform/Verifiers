import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../application';
import {
  UPPAALenvironment,
  VerifytaOutputParser,
  VerifytaVerifier,
} from '../infrastructure';

type Body = {
  name: string;
};

export async function exerciseController(
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
      const body = request.body;
      console.log(body);
      //reply.send(await user.verifySolution({}));
    },
  );
}
