import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../application';
import {
  UPPAALenvironment,
  VerifytaOutputParser,
  VerifytaVerifier,
} from '../infrastructure';

interface IXMLfile {
  nta: string
}

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
      const body: IXMLfile = request.body as IXMLfile;
      reply.send(body)
      //reply.send(await user.verifySolution({}));
    },
  );
}
