const BASE_URL = import.meta.env.VITE_API_URL;

export const getTodos = async () => {
  const res = await fetch(`${BASE_URL}/api/getTodos`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};

export const createTodo = async (todo) => {
  const res = await fetch(`${BASE_URL}/api/createTodo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return await res.json();
};

export const deleteTodo = async (id) => {
  const res = await fetch(`${BASE_URL}/api/deleteTodo/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};

export const updateTodo = async (todo) => {
  const res = await fetch(`${BASE_URL}/api/updateTodo`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  const data = await res.json();
  return data;
};
