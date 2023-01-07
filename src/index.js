import "./styles/normalize.css";
import "./styles/index.css";
import {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
} from "./requests/products";
import {
  getUsers,
  getUsersByName,
  getUserCartsById,
  getUserPostsById,
  addUser,
} from "./requests/users";

import { findPosts, getAllPosts, changePost } from "./requests/posts";
import {
  allProductsMarkup,
  productMarkup,
  addedProductMarkup,
  usersMarkup,
  userCartsMarkup,
  userPostsMarkup,
  newUserMarkup,
  keywordPostsMarkup,
  allPostsMarkup,
  changedPostMarkup,
} from "./services/markupService";
//-------------------1-----------------------
const listOfProducts = document.querySelector("#allProducts");

async function renderProducts() {
  try {
    const products = await getProducts();
    const markup = allProductsMarkup(products);

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
  productEl.innerHTML = "";
  try {
    const product = await getProduct(id);
    const markup = productMarkup(product);
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
  renderAddedProduct(obj);
}
async function renderAddedProduct(title, description, price) {
  try {
    const addedProduct = await addProduct(title, description, price);
    const markup = addedProductMarkup(addedProduct);
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
  try {
    const users = await getUsers();
    const markup = usersMarkup(users);
    allUsers.innerHTML = markup;
  } catch (error) {
    console.log(error);
  }
}
renderUsers();
////-------------------6-----------------------
const userByNameForm = document.querySelector("#userByNameForm");
userByNameForm.addEventListener("submit", renderFoundUsers);
const listOfUsers = document.querySelector("#usersByName");

async function renderFoundUsers(event) {
  event.preventDefault();
  listOfUsers.innerHTML = "";
  const name = userByNameForm.name.value;
  try {
    const users = await getUsersByName(name);
    if (users.length) {
      const markup = usersMarkup(users);
      listOfUsers.insertAdjacentHTML("beforeend", markup);
    } else {
      alert(`There is no user with ${name}`);
    }
  } catch (error) {
    console.log(error);
  }
}
////-------------------7-----------------------
const userCartsForm = document.querySelector("#userCartsForm");
const carts = document.querySelector("#carts");
userCartsForm.addEventListener("submit", renderUser);

async function renderUser(event) {
  event.preventDefault();
  carts.innerHTML = "";
  const id = userCartsForm.userId.value;

  try {
    const userCarts = await getUserCartsById(id);
    if (userCarts.length) {
      const products = userCarts[0].products;
      const markup = userCartsMarkup(products);
      carts.innerHTML = markup;
    } else {
      alert(`The cart of user with id-${id} is empty`);
    }
  } catch (error) {
    console.log(error);
  }
}
////-------------------8-----------------------
const userPostsForm = document.querySelector("#userPostsForm");
const posts = document.querySelector("#posts");
userPostsForm.addEventListener("submit", renderPosts);
async function renderPosts(event) {
  event.preventDefault();
  posts.innerHTML = "";
  const id = userPostsForm.userId.value;
  try {
    const userPosts = await getUserPostsById(id);
    if (userPosts.length) {
      const markup = userPostsMarkup(userPosts);
      posts.insertAdjacentHTML("beforeend", markup);
      console.log(markup);
    } else {
      alert(`User with id ${id} doesn't have any posts`);
    }
  } catch (error) {
    alert(error.code);
  }
}
////-------------------9-----------------------
const addingNewUserForm = document.querySelector(".addingNewUserForm");
const newUserSection = document.querySelector("#newUserSection");
addingNewUserForm.addEventListener("submit", addNewUser);

async function addNewUser(event) {
  event.preventDefault();
  newUserSection.innerHTML = "";
  const obj = {
    firstName: addingNewUserForm.firstName.value,
    lastName: addingNewUserForm.lastName.value,
    email: addingNewUserForm.email.value,
  };
  try {
    if (
      addingNewUserForm.firstName.value &&
      addingNewUserForm.lastName.value &&
      addingNewUserForm.email.value
    ) {
      const newUser = await addUser(obj);
      newUserSection.innerHTML = newUserMarkup(newUser);
    } else {
      alert("Please, fill all the fields!");
    }
  } catch (error) {
    alert(error.code);
  }
}
////-------------------10-----------------------
const filteredPostsForm = document.querySelector("#filteredPostsForm");
const filteredPosts = document.querySelector("#filteredPosts");
filteredPostsForm.addEventListener("submit", filterPostsByKeyword);

async function filterPostsByKeyword(e) {
  e.preventDefault();
  filteredPosts.innerHTML = "";
  const keyword = filteredPostsForm.keyword.value;
  try {
    const posts = await findPosts(keyword);
    if (posts.length) {
      filteredPosts.insertAdjacentHTML("beforeend", keywordPostsMarkup(posts));
    } else {
      alert("There are no posts with such keyword. Please, try again");
    }
  } catch (error) {
    alert(error.code);
  }
}
////-------------------11-----------------------
const allPosts = document.querySelector("#allPosts");
const obj = {};
async function renderAllPosts() {
  try {
    const posts = await getAllPosts();
    allPosts.insertAdjacentHTML("beforeend", allPostsMarkup(posts));
    const changeBtn = document.querySelectorAll("#changeBtn");
    allPosts.addEventListener("click", onChangeBtnClick);
  } catch (error) {
    alert(error.code);
  }
}
renderAllPosts();

async function onChangeBtnClick(event) {
  if (event.target.className === "changeBtn") {
    event.target.disabled = true;
    const id = event.target.dataset.id;
    console.log(id);
    const post = event.target.parentElement;
    const formMarkup =
      '<form class="changingPostForm"><label>Title</label><input type="text" name="title" /><label>Tags</label><input type="text" name="tags" /><button type="submit">Change</button></form>';
    post.insertAdjacentHTML("beforeend", formMarkup);
    const changingPostForm = document.querySelector(".changingPostForm");
    changingPostForm.addEventListener("input", (event) => {
      obj[event.target.name] = event.target.value;
    });
    changingPostForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      try {
        const changedPost = await changePost(id, obj);
        post.innerHTML = changedPostMarkup(changedPost);
      } catch (error) {
        alert(error.code);
      }
    });
  }
}
