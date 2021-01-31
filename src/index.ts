import fastify from 'fastify';
import { UserRoute } from "./routes/UserRoute";
import { PostRoute } from "./routes/PostRoute";

const server = fastify();


server.register(UserRoute);
server.register(PostRoute);

server.listen(8080, (err: any, address:any) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
