import { apiInstance } from "../services/api";
async function getUsers() {
  const response = await apiInstance("/users?limit=100");
  return response.data.users;
}

async function getUsersByName(name) {
  const response = await apiInstance(`users/search?q=${name}`);
  return response.data.users;
}
async function getUserCartsById(id) {
  const response = await apiInstance(`users/${id}/carts`);
  return response.data.carts;
}

async function getUserPostsById(id) {
  const response = await apiInstance(`users/${id}/posts`);
  return response.data.posts;
}
async function addUser(obj) {
  const response = await apiInstance.post("users/add", obj);
  return response.data;
}
export {
  getUsers,
  getUsersByName,
  getUserCartsById,
  getUserPostsById,
  addUser,
};
