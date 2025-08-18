const BASE_URL = "http://localhost:5200/api";

export const getTodos = async () => {
  const res = await fetch(`${BASE_URL}/getTodos`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};

export const createTodo = async (todo) => {
  const res = await fetch(`${BASE_URL}/createTodo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return await res.json();
};

export const deleteTodo = async (id) => {
  const res = await fetch(`${BASE_URL}/deleteTodo/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};

export const updateTodo = async (todo) => {
  const res = await fetch(`${BASE_URL}/updateTodo`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  const data = await res.json();
  return data;
};
