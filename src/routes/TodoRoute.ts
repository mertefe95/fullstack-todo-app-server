import {
  getAllTodos,
  getTodo,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../todo_operations";
import { getUser } from "../user_operations";
import { auth } from "../middleware/auth";

async function TodoRoute(fastify: any, options: any) {
  fastify.get("/todos", async (request: any, reply: any) => {
    try {
      getAllTodos().then((result) => {
        return reply.status(200).send(result);
      });
    } catch (err) {
      return reply.status(500).send(err.message);
    }
  });

  fastify.get("/todos/:id", async (request: any, reply: any) => {
    try {
      getTodo(request.params.id).then((result) => {
        return reply.status(200).send(result);
      });
    } catch (err) {
      return reply.status(500).send(err.message);
    }
  });

  fastify.post("/todos/add", async (request: any, reply: any) => {
    try {
      const { title, text, userId } = request.body;

      if (!title) {
        return reply.status(400).send({ msg: "Please enter a title." });
      } else if (!text) {
        return reply.status(400).send({ msg: "Please enter a text." });
      } else if (!userId) {
        return reply.status(400).send({ msg: "Please enter an author." });
      }

      const user = await getUser(userId);
      console.log(user);

      const newTodo = {
        title: title,
        text: text,
        author: user[0].username,
        userId: userId,
      };

      addTodo(newTodo).then((result) => {
        return reply.status(200).send({ msg: "Todo succesfully created." });
      });
    } catch (err) {
      return reply.status(500).send(err.message);
    }
  });

  fastify.put("/todos/:id", async (request: any, reply: any) => {
    try {
      const { title, text } = request.body;

      updateTodo(request.params.id, title, text).then((result) => {
        return reply.status(200).send({ msg: "Todo succesfully updated." });
      });
    } catch (err) {
      return reply.status(500).send(err.message);
    }
  })

  fastify.delete("/todos/:id", async (request: any, reply: any) => {
    try {
      deleteTodo(request.params.id).then((result) => {
        return reply.status(200).send({ msg: "Todo succesfully deleted." });
      });
    } catch (err) {
      return reply.status(500).send(err.message);
    }
  });
}

export { TodoRoute };
