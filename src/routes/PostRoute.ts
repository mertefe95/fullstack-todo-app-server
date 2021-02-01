import { getAllPosts, getPost, addPost, deletePost, updatePost } from "../post_operations";

async function PostRoute (fastify: any, options: any) {
  
  fastify.get('/posts', async (request: any, reply: any) => {
    getAllPosts().then(result => {

        return reply.status(200).send(result[0]);
      })

  })

  fastify.get('/posts/:id', async (request: any, reply: any) => {
    getPost(request.params.id).then(result => {

      return reply.status(200).send(result[0]);
    })
  })

  fastify.post('/posts/add', async (request: any, reply: any) => {

    const { title, text, author } = request.body;

    if (!title || !text || !author) {
      return reply.status(400).send({ msg: "Please fill all the necessary fields." })
    }

    let post = {
      title,
      text,
      author
    }
    await addPost(post).then(result => {

      return reply.status(200).send({ msg: "Post has been succesfully added." });
    })
  })

  fastify.delete('/posts/:id', async (request: any, reply: any) => {

    try {
    deletePost(request.params.id).then(result => {

      return reply.status(200).send({ msg: "Post succesfully deleted." });
    })
    } catch (err:any) {
      return reply.status(500).send({ msg: err.message })
      }

  })

  fastify.put('/posts/:id', async (request: any, reply: any) => {
    try {
      const { title, text } = request.body;

      updatePost(request.params.id, title, text).then(result => {
        
        return reply.status(200).send({ msg: "Post succesfully updated." });
        
      }) 
    } catch (err:any) {
      return reply.status(500).send({ msg: err.message })
    }
  })

}

export { PostRoute };