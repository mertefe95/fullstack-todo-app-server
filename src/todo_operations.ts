import client from "./dbproduction";

async function getAllTodos() {
  try {
    client.connect();
    const posts = await client.query("SELECT * from todos");
    client.end();
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
    client.connect();
    const insertTodo = await client.query(`INSERT INTO todos (title, text, author, userId) 
            values 
            ('${newTodo.title}', '${newTodo.text}', '${newTodo.author}', ${newTodo.userId})`);
            client.end();
    return insertTodo.rows;
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

export { getAllTodos, getTodo, addTodo, deleteTodo, updateTodo };
