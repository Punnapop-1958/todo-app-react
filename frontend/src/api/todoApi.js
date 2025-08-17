const BASE_URL = "http://localhost:5200/api";

export const getTodos = async () => {
  const res = await fetch(`${BASE_URL}/getTodos`, {});
  const data = await res.json();
  return data;
};
