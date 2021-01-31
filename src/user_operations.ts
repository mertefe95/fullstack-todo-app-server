import config from "./dbconfig";
const sql = require('mssql')

async function getAllUsers(){
  try {
    let pool = await sql.connect(config);
    let users = await pool.request().query("SELECT * from users");
    return users.recordsets;
  }
  catch (error) {
    console.log(error)
  }
}

async function getUser(id:any){
  try {
    let pool = await sql.connect(config);
    let user = await pool.request()
    .input('input_parameter', sql.Int, id)
    .query("SELECT * from users where id = @input_parameter");
    return user.recordsets[0];
  }
  catch (error) {
    console.log(error)
  }
}

async function addUser(user:any) {
  try {

    let pool = await sql.connect(config);
    let insertUser = await pool.request()
      .input('username', sql.NVarChar, user.username)
      .input('email', sql.NVarChar, user.email)
      .input('password', sql.NVarChar, user.hashedPassword)
      .query(`INSERT INTO users (username, email, password) 
            VALUES 
            (@username, @email, @password)`)
      return insertUser.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}


async function getUserByUsername(username:any) {
  try {
    let pool = await sql.connect(config);
    let user = await pool.request()
      .input('username', sql.NVarChar, username)
      .query("SELECT * from users where username = @username");
      return user.recordsets[0];
  } catch (error) {
    console.log(error)
  }
}

async function getUserByEmail(email:any) {
  try {
    let pool = await sql.connect(config);
    let user = await pool.request()
      .input('email', sql.NVarChar, email)
      .query("SELECT * from users where email = @email");
      return user.recordsets[0];
  } catch (error) {
    console.log(error)
  }
}



export { getAllUsers, getUser, addUser, getUserByUsername, getUserByEmail  };