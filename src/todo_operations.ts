import pool from "./db";
import client from "./dbproduction";


client.connect();



async function getAllTodos() {
  try {
    const posts = await client.query("SELECT * from todos");
    return posts.rows;
  } catch (error) {
    console.log(error);
  }
}

async function getTodo(id: any) {
  try {
    const todo = await client.query(`SELECT * from todos where id = ${id}`);
    return todo.rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function addTodo(newTodo: any) {
  try {
    const insertTodo = await client.query(`INSERT INTO todos (title, text, author, userId) 
            values 
            ('${newTodo.title}', '${newTodo.text}', '${newTodo.author}', ${newTodo.userId})`);
    return insertTodo.rows[0];
  } catch (err) {
    console.log(err);
  }
}

async function deleteTodo(id: number) {
  try {
    const deletedTodo = await client.query(`DELETE FROM todos WHERE id = ${id}`);
    return deletedTodo.rows[0];
  } catch (err) {
    console.log(err);
  }
}

async function updateTodo(id: number, title: string, text: string) {
  try {
    const updateTodo = await client.query(
      `UPDATE todos SET title = '${title}', text = '${text}' WHERE id = ${id}`
    );
    return updateTodo.rows[0];
  } catch (err) {
    console.log(err);
  }
}
client.end();

export { getAllTodos, getTodo, addTodo, deleteTodo, updateTodo };
