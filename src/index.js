import "./styles/normalize.css";
import "./styles/index.css";
import {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
} from "./requests/products";
import { getUsers } from "./requests/users";
//-------------------1-----------------------
const listOfProducts = document.querySelector("#allProducts");

async function renderProducts() {
  try {
    const products = await getProducts();
    const markup = products
      .map(
        ({ title, thumbnail, brand, description, price }) =>
          `<li class="product-item">
          <h2>${title}</h2>
          <img src="${thumbnail}" alt="${title}" loading="lazy" width='300'/>
        <p><b> Brand: ${brand}</b></p>
          <p>Description: ${description}.</p>
          <span>Price: ${price}.</span>
        </li>`
      )
      .join(" ");

    listOfProducts.insertAdjacentHTML("beforeend", markup);
  } catch (error) {
    console.log(error);
  }
}
renderProducts();

////-------------------2-----------------------
const form = document.querySelector("#singleProductForm");
const productEl = document.querySelector("#singleProduct");
form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const id = form.id.value;
  renderProduct(id);
}
async function renderProduct(id) {
  try {
    const product = await getProduct(id);
    const { title, thumbnail, brand, description, price } = product;
    const markup = `<h2>${title}</h2>
          <img src="${thumbnail}" alt="${title}" load=lazy width='300'/>
        <p><b> Brand: ${brand}</b></p>
          <p>Description: ${description}.</p>
          <span>Price: ${price}.</span>`;
    productEl.innerHTML = markup;
  } catch (error) {
    console.log(error);
  }
}
////-------------------3-----------------------
const addForm = document.querySelector(".addingProductForm-js");
const newProduct = document.querySelector("#newProductSection");
addForm.addEventListener("submit", onAddFormSubmit);
function onAddFormSubmit(event) {
  event.preventDefault();
  const title = addForm.title.value;
  const description = addForm.description.value;
  const price = addForm.price.value;
  const obj = {
    title,
    description,
    price,
  };
  renderAddedProduct(title, description, price);
}
async function renderAddedProduct(title, description, price) {
  try {
    const addedProduct = await addProduct(title, description, price);
    console.log(addedProduct);
    const markup = `<h2>${addedProduct.title}</h2><span>ID: ${addedProduct.id}.</span><p>Description: ${addedProduct.description}.</p>
           <span>Price: ${addedProduct.price}.</span>`;
    newProduct.innerHTML = markup;
  } catch (error) {
    console.log(error);
  }
}
////-------------------4-----------------------
const deletingForm = document.querySelector("#deletionProductForm");
deletingForm.addEventListener("submit", onDeletingFormSubmit);
async function onDeletingFormSubmit(event) {
  event.preventDefault();
  const id = deletingForm.deletionId.value;
  try {
    const data = await deleteProduct(id);
    if (data.isDeleted) {
      const { id, title, brand, deletedOn } = data;
      alert(
        `SUCCESS! 
        \n ID: ${id}
        \n Brand: ${brand}
        \n Title: ${title} 
        \n Deleted on: ${deletedOn}`
      );
    }
  } catch (error) {
    alert(`ERROR! ${error.code}`);
  }
}
////-------------------5-----------------------
const allUsers = document.querySelector("#allUsers");
async function renderUsers() {
  const users = await getUsers();
  const markup = users
    .map(
      ({ id, firstName, lastName, age, gender, image, university }) =>
        ` <li class="user">
      <img src=${image} alt="${id}" loading="lazy" />
      <h2>${firstName} ${lastName}</h2>
      <p><b>Id:</b> ${id}</p>
      <p><b>Gender:</b>  ${gender}</p>
      <p><b>Age:</b> ${age}</p>
      <p><b>University:</b> ${university}</p>
    </li>`
    )
    .join("");
  allUsers.innerHTML = markup;
}
renderUsers();
