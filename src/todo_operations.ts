import pool from "./dbproduction";

interface newTodoInterface {
  title: string;
  text: string;
  author: string;
  userId: number;
}

async function getAllTodos() {
  try {
    const posts = await pool.query("SELECT * from todos");
    return posts.rows;
  } catch (error) {
    console.log(error);
  }
}

async function getTodo(id: number) {
  try {
    const todo = await pool.query(`SELECT * from todos where id = ${id}`);
    return todo.rows;
  } catch (error) {
    console.log(error);
  }
}

async function addTodo(newTodo: newTodoInterface) {
  try {
    const insertTodo = await pool.query(`INSERT INTO todos (title, text, author, userId) 
            values 
            ('${newTodo.title}', '${newTodo.text}', '${newTodo.author}', ${newTodo.userId})`);

    return insertTodo.rows;
  } catch (err) {
    console.log(err);
  }
}

async function deleteTodo(id: number) {
  try {
    const deletedTodo = await pool.query(`DELETE FROM todos WHERE id = ${id}`);
    return deletedTodo.rows;
  } catch (err) {
    console.log(err);
  }
}

async function updateTodo(id: number, title: string, text: string) {
  try {
    const updateTodo = await pool.query(
      `UPDATE todos SET title = '${title}', text = '${text}' WHERE id = ${id}`
    );
    return updateTodo.rows;
  } catch (err) {
    console.log(err);
  }
}

export { getAllTodos, getTodo, addTodo, deleteTodo, updateTodo };
