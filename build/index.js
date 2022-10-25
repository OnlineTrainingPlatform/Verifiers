"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = __importDefault(require("fastify"));
var presentation_1 = require("./presentation");
var server = (0, fastify_1.default)();
server.register(presentation_1.exerciseController);
server.listen({ port: 8081 }, function (err, address) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log("Server listening at ".concat(address));
});
