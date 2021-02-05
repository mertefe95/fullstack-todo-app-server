const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.SECRET_TOKEN)

const auth = (request: any, reply: any, next: any) => {
  try {
    const token = request.header["x-auth-token"]

    if(!token) {
      return reply
        .status(401)
        .send({ msg: "Token not found. Authorization has been denied." })
    }

    const isVerified = jwt.verify(token, process.env.SECRET_TOKEN!)
    if (!isVerified) {
      return reply
        .status(400)
        .send({ msg: "Unsuccesful token verification. Authentication denied." });
    }


    next();
} catch (err) {
  return reply
    .status(500)
    .send(err)
}}


export {auth};