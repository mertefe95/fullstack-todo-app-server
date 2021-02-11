import fastify from "fastify";
import { UserRoute } from "./routes/UserRoute";
import { TodoRoute } from "./routes/TodoRoute";

const server = fastify();

server.register(UserRoute);
server.register(TodoRoute);

server.register(require("fastify-swagger"), {
  mode: "static",
  specification: {
    path: "../src/swagger.yaml",
  },
  exposeRoute: true,
});

server.register(require("fastify-cors"), {
  methods: ['GET', 'PUT', 'POST', 'DELETE']
});

const PORT = process.env.PORT || 8080;
const host = "0.0.0.0";
server.listen(PORT, host, (err: any, address: any) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
