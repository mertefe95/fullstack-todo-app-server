import pool from "./db";

async function getAllUsers(){
  try {
    const users = await pool.query("SELECT * FROM users");
    return users.rows;
  }
  catch (error) {
    console.log(error)
  }
}

async function getUser(id:any){
  try {

    const user = await pool
    .query(`SELECT * from users where id = ${id}`);
    return user.rows;
  }
  catch (error) {
    console.log(error)
  }
}

async function addUser(user:any) {
  try {


    const insertUser = await pool
      .query(`INSERT INTO users (username, email, password) 
            VALUES 
            ('${user.username}', '${user.email}', '${user.hashedPassword}')`)
      return insertUser.rows;
  }
  catch (err) {
    console.log(err);
  }
}


async function getUserByUsername(username:any) {
  try {
    const user = await pool
      .query(`SELECT * from users WHERE username = '${username}'`);
      return user.rows;
  } catch (error) {
    console.log(error)
  }
}

async function getUserByEmail(email:any) {
  try {
    const user = await pool
      .query(`SELECT * from users WHERE email = '${email}'`);
      return user.rows;
  } catch (error) {
    console.log(error)
  }
}


export { getAllUsers, getUser, addUser, getUserByUsername, getUserByEmail  };