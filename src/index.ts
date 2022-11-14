import fastify from 'fastify';
import { verifierController } from './presentation';
import * as dotenv from 'dotenv';
import { rootPath } from './infrastructure';

// Load the ".env" file from the root. Afterwards check all required environment bindings
const envResult = dotenv.config();
if (!envResult.error) {
  console.log(`dotenv failed parsing the .env file ${envResult.error!}`);
}

if (process.env.API_PREFIX == undefined) {
  console.log("Missing environment variable 'API_PREFIX'");
  process.exit(1);
}

if (process.env.ROOT_PATH == undefined) {
  const defaultRootPath = rootPath();
  console.log(
    `Missing environment variable 'ROOT_PATH' defaults to ${defaultRootPath}`,
  );
}

if (!process.env.PORT) {
  const defaultPort = '8080';
  console.log(`Missing environment variable 'PORT' defaults to ${defaultPort}`);
  process.env.PORT = defaultPort;
}

if (!process.env.HOST) {
  const defaultHost = 'localhost';
  console.log(`Missing environment variable 'HOST' defaults to ${defaultHost}`);
  process.env.HOST = defaultHost;
}

const server = fastify();
server.register(verifierController, {
  prefix: process.env.API_PREFIX,
});

server.listen(
  { port: Number(process.env.PORT), host: process.env.HOST },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    
    console.log(`Server listening at ${address}`);
  },
);
