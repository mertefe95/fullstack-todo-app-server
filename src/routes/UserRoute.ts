import {
  getAllUsers,
  getUser,
  addUser,
  getUserByEmail,
  getUserByUsername,
} from "../user_operations";
import { FastifyReply, FastifyRequest } from "fastify";
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({
  path: `${__dirname}/../../.env`,
});
import { IncomingMessage, ServerResponse } from "http";
interface userInfo {
  username: string;
  email: string;
  hashedPassword: string;
}

async function UserRoute(fastify: any, options: any) {
  fastify.get("/users", async (request: any, opts: any, reply: any) => {
    try {
      getAllUsers().then((result) => {
        return reply.status(200).send(result);
      });
    } catch (e) {
      return reply.status(500).send(e);
    }
  });

  fastify.get("/users/:id", async (request: any, reply: any) => {
    getUser(request.params.id).then((result) => {
      return reply.status(200).send(result);
    });
  });

  fastify.post("/users/register", async (request: any, reply: any) => {
    const { username, email, password } = request.body;

    const number = /^(?=.*\d)/;
    const letter = /^(?=.*[A-Z])/;

    if (!username) {
      return reply.status(400).send({ msg: "Please enter an username." });
    } else if (!email) {
      return reply.status(400).send({ msg: "Please enter an email." });
    } else if (!password) {
      return reply.status(400).send({ msg: "Please enter a password." });
    } else if (!validator.isEmail(email)) {
      return reply
        .status(400)
        .send({ msg: "Please enter a valid email format." });
    } else if (!number.test(password)) {
      return reply.status(400).send({
        msg: "Please enter a password that is containing at least a number.",
      });
    } else if (!letter.test(password)) {
      return reply.status(400).send({
        msg: "Please enter at least one uppercase letter in your password.",
      });
    } else if (password.length < 6) {
      return reply.status(400).send({
        msg: "Please enter a password that is at least 6 or more characters. ",
      });
    }

    const emailRes = await getUserByEmail(email);
    const userRes = await getUserByUsername(username);

    if (emailRes.length) {
      return reply.status(400).send({
        msg: "The email is already being used, please enter a different email.",
      });
    } else if (userRes.length) {
      return reply.status(400).send({
        msg:
          "The username is already being used, please enter a different username.",
      });
    }

    const theSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, theSalt);
    const user: userInfo = {
      username,
      email,
      hashedPassword,
    };

    addUser(user).then((result) => {
      return reply.status(200).send({ msg: "User is succesfully created." });
    });
  });

  fastify.post("/users/login", async (request: any, reply: any) => {
    try {
      const { email, password } = request.body;

      if (!email) {
        return reply.status(400).send({ msg: "Please enter an email." });
      } else if (!password) {
        return reply.status(400).send({ msg: "Please enter your password." });
      }

      const userRes = await getUserByEmail(email);

      if (!userRes.length) {
        return reply
          .status(400)
          .send({ msg: "User with this email does not exist." });
      }

      const passwordCompare = await bcrypt.compare(
        password,
        userRes[0].password
      );
      if (!passwordCompare) {
        return reply.status(400).send({ msg: "Wrong password." });
      }

      const token = await jwt.sign(
        { id: userRes[0].id, email: userRes[0].email },
        process.env.SECRET_KEY!
      );

      return reply.status(200).send({
        token,
        user: {
          id: userRes[0].id,
          username: userRes[0].username,
          email: userRes[0].email,
        },
      });
    } catch (err) {
      reply.status(500).send({ msg: err.message });
    }
  });

  fastify.post("/users/tokenIsValid", async (request: any, reply: any) => {
    try {
      const token = request.headers["x-auth-token"];
      console.log(token);

      if (!token) return reply.status(400).send({ msg: "Not existing." });

      const verified = await jwt.verify(token, process.env.SECRET_KEY);
      if (!verified) return reply.status(400).send(false);

      const user = await getUser(verified.id);
      if (!user) return reply.send(false);

      return reply.status(200).send({
        username: user[0].username,
        id: user[0].id,
        email: user[0].email,
      });
    } catch (err) {
      return reply.status(500).send({ msg: err.message });
    }
  });
}

export { UserRoute };
