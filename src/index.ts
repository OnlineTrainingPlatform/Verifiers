import fastify from 'fastify';
import { verifierController } from './presentation';

const server = fastify();
server.register(verifierController);

server.listen({ port: 8081 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
