"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = __importDefault(require("fastify"));
var presentation_1 = require("./presentation");
var dotenv = __importStar(require("dotenv"));
var infrastructure_1 = require("./infrastructure");
// Load the ".env" file from the root. Afterwards check all required environment bindings
var envResult = dotenv.config();
if (!envResult.error) {
    console.log("dotenv failed parsing the .env file ".concat(envResult.error));
}
if (process.env.ROOT_PATH == undefined) {
    var defaultRootPath = (0, infrastructure_1.rootPath)();
    console.log("Missing environment variable 'ROOT_PATH' defaults to ".concat(defaultRootPath));
}
if (!process.env.PORT) {
    var defaultPort = "8080";
    console.log("Missing environment variable 'PORT' defaults to ".concat(defaultPort));
    process.env.PORT = defaultPort;
}
if (!process.env.HOST) {
    var defaultHost = 'localhost';
    console.log("Missing environment variable 'HOST' defaults to ".concat(defaultHost));
    process.env.HOST = defaultHost;
}
var server = (0, fastify_1.default)();
server.register(presentation_1.verifierController);
server.listen({ port: Number(process.env.PORT), host: process.env.HOST }, function (err, address) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log("Server listening at ".concat(address));
});
