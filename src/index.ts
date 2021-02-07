import fastify from "fastify";
import { UserRoute } from "./routes/UserRoute";
import { TodoRoute } from "./routes/TodoRoute";
import pool from "./db";


const server = fastify();

server.register(UserRoute);
server.register(TodoRoute);

server.register(require("fastify-cors"), {});

const PORT = process.env.PORT || 8080;
const host = "0.0.0.0";
server.listen(PORT, host, (err: any, address: any) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
