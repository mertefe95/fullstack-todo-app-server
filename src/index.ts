import fastify from "fastify";
import { UserRoute } from "./routes/UserRoute";
import { TodoRoute } from "./routes/TodoRoute";
import pool from "./db";

const server = fastify();

server.register(UserRoute);
server.register(TodoRoute);

server.register(require("fastify-cors"), {});

const PORT = process.env.PORT || 8080;

server.listen(PORT, (err: any, address: any) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
