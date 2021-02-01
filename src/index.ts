import fastify from 'fastify';
import { UserRoute } from "./routes/UserRoute";
import { PostRoute } from "./routes/PostRoute";



const server = fastify();


server.register(UserRoute);
server.register(PostRoute);

server.register(require('fastify-cors'), {
  origin: /\*/,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type', 'Authorization'],
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']
})


const PORT = process.env.PORT || 8080;

server.listen(process.env.PORT || '0.0.0.0', (err: any, address:any) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})  
