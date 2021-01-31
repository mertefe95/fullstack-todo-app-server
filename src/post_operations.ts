import config from "./dbconfig";
const sql = require('mssql')

async function getAllPosts(){
  try {
    let pool = await sql.connect(config);
    let posts = await pool.request().query("SELECT * from posts");
    return posts.recordsets;
  }
  catch (error) {
    console.log(error)
  }
}

async function getPost(id:any){
  try {
    let pool = await sql.connect(config);
    let post = await pool.request()
    .input('input_parameter', sql.Int, id)
    .query("SELECT * from posts where id = @input_parameter");
    return post.recordsets;
  }
  catch (error) {
    console.log(error)
  }
}


async function addPost(post:any) {
  try {

    let pool = await sql.connect(config);
    let insertPost = await pool.request()
      .input('title', sql.NVarChar, post.title)
      .input('text', sql.NVarChar, post.text)
      .input('author', sql.NVarChar, post.author)
      .query(`INSERT INTO posts (title, text, author) 
            VALUES 
            (@title, @text, @author)`)
      return insertPost.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}

async function deletePost(id:any) {
  try {
    let pool = await sql.connect(config);
    let deletePost = await pool.request()
      .input('id', sql.Int, id)
      .query("DELETE FROM posts WHERE id = @id")
      return deletePost.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function updatePost(id:any, title:any, text:any) {
  try {
    let pool = await sql.connect(config);
    let updatePost = await pool.request()
      .input('id', sql.Int, id)
      .input('title', sql.NVarChar, title)
      .input('text', sql.NVarChar, text)
      .query(`UPDATE posts SET title = @title, text = @text WHERE id = @id`)
  } catch (err) {
    console.log(err);
  }
}

export { getAllPosts, getPost, addPost, deletePost, updatePost };