import { apiInstance } from "../services/api";
async function findPosts(keyword) {
  const response = await apiInstance.get(`/posts/search?q=${keyword}`);
  return response.data.posts;
}
async function getAllPosts() {
  const response = await apiInstance.get("/posts");
  return response.data.posts;
}
async function changePost(id, obj) {
  const response = await apiInstance.patch(`/posts/${id}`, obj);
  return response.data;
}
export { findPosts, getAllPosts, changePost };
