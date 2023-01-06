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
  const config = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  };
  console.log("config", config);
  const response = await apiInstance.patch(`/posts/${id}`, config);
  return response;
}
export { findPosts, getAllPosts, changePost };
