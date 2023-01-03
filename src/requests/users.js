import { apiInstance } from "../services/api";
async function getUsers() {
  const response = await apiInstance("/users?limit=100");
  return response.data.users;
}
export { getUsers };
