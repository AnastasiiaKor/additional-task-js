import { apiInstance } from "../services/api";
export async function getPosts() {
  apiInstance.get("/docs/posts");
}
// getUsers();
