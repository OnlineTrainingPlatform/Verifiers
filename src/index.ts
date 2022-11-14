import fastify from 'fastify';
import { verifierController } from './presentation';
import * as dotenv from 'dotenv';

// Load the ".env" file from the root. Afterwards check all required environment bindings
const envResult = dotenv.config();
if (!envResult.error) {
  console.log(`dotenv failed parsing the .env file ${envResult.error!}`);
}

if (process.env.ROOT_PATH == undefined) {
  const defaultRootPath = __dirname.substring(0, __dirname.lastIndexOf('/') - 1)
  console.log("Missing environment variable 'ROOT_PATH' defaults to " + defaultRootPath);
}


const server = fastify();
server.register(verifierController);

server.listen({ port: 8081 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
