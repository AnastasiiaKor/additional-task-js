import { apiInstance } from "../services/api";
async function getProducts() {
  const response = await apiInstance("/products?limit=100");
  return response.data.products;
}

async function getProduct(id) {
  const response = await apiInstance(`/products/${id}`);
  return response.data;
}

async function addProduct(obj) {
  const response = await apiInstance.post("/products/add", obj);
  return response.data;
}

async function deleteProduct(id) {
  const response = await apiInstance(`/products/${id}`, {
    method: "DELETE",
  });
  return response.data;
}
export { getProducts, getProduct, addProduct, deleteProduct };
