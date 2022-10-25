import fastify from 'fastify';
import { exerciseController } from './presentation';


const server = fastify();
server.register(require('fastify-xml-body-parser'))
server.register(exerciseController);

server.listen({ port: 8081 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});