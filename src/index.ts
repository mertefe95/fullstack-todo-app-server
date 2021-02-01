import fastify from 'fastify';
import { UserRoute } from "./routes/UserRoute";
import { PostRoute } from "./routes/PostRoute";
import fastify-cors from "fastify-cors";


const server = fastify();


server.register(UserRoute);
server.register(PostRoute);
server.register(fastify-cors, {
  
})

const PORT = process.env.PORT || 8080;

server.listen(PORT, (err: any, address:any) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})  
