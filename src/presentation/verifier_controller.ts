import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../application';

export async function exerciseController(
  fastify: FastifyInstance,
  opts: any,
): Promise<void> {
  fastify.get(
    '/verifiers/verifyta',
    async (request: FastifyRequest, reply: FastifyReply) => {
      //const user = new User();
      reply.send(await user.verifySolution({}));
    },
  );
}
