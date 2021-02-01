const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.SECRET_TOKEN)

const auth = (req: any, res: any, next: any) => {
  try {
    const token = req.header("x-auth-token")

    if(!token) {
      return res
        .status(401)
        .json({ msg: "Token not found. Authorization has been denied." })
    }

    const isVerified = jwt.verify(token, process.env.SECRET_TOKEN!)
    if (!isVerified) {
      return res
        .status(400)
        .json({ msg: "Unsuccesful token verification. Authentication denied." });
    }


    next();
} catch (err) {
  return res
    .status(500)
    .send(err)
}}


export {auth};