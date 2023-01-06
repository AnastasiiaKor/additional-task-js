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
          <div class="image-wrapper"><img src="${thumbnail}" alt="${title}" loading="lazy" width='300'/></div>
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
  productEl.innerHTML = "";
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
  try {
    const users = await getUsers();
    const markup = users
      .map(
        ({ id, firstName, lastName, age, gender, image, university }) =>
          ` <li class="user">
        <div class="image-wrapper">
        <img src=${image} alt="${id}" loading="lazy" />
        </div>
      <h2>${firstName} ${lastName}</h2>
      <p><b>Id:</b> ${id}</p>
      <p><b>Gender:</b>  ${gender}</p>
      <p><b>Age:</b> ${age}</p>
      <p><b>University:</b> ${university}</p>
    </li>`
      )
      .join("");
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
      const markup = users
        .map(
          ({ id, firstName, lastName, age, gender, image, university }) =>
            ` <li class="user">
        <div class="image-wrapper">
        <img src=${image} alt="${id}" loading="lazy" />
        </div>
      <h2>${firstName} ${lastName}</h2>
      <p><b>Id:</b> ${id}</p>
      <p><b>Gender:</b>  ${gender}</p>
      <p><b>Age:</b> ${age}</p>
      <p><b>University:</b> ${university}</p>
    </li>`
        )
        .join("");
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
      const markup = userCarts[0].products
        .map(
          ({ id, title, price, quantity, total }) =>
            `<li class='carts-item'>
  <p>Id of product: ${id}</p>
  <p>Name of product: ${title}</p>
  <p>Price: ${price}</p>
  <p>Quantity: ${quantity}</p>
  <p>Quantity: ${total}</p>
</li>`
        )
        .join("");
      carts.innerHTML = markup;

      console.log(markup);
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
    console.log(userPosts);
    if (userPosts.length) {
      const markup = userPosts
        .map(
          ({ id, title, tags }) =>
            `<li class="posts-item">
      <h2>Title: ${title}</h2>
      <p>ID: ${id}</p>
      <p>Tags: ${tags}</p>
    </li>`
        )
        .join("");
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
      const markup = `
      <p><b>Fisrt Name:</b> ${newUser.firstName}</p>
      <p><b>Last Name:</b>  ${newUser.lastName}</p>
      <p><b>ID:</b> ${newUser.id}</p>
      <p><b>Email:</b> ${newUser.email}</p>`;
      newUserSection.innerHTML = markup;
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
    console.log(posts);
    if (posts.length) {
      console.log(posts);
      const markup = posts
        .map(
          ({ id, title, tags, userId }) =>
            `<li class="posts-item">
      <h2>Title: ${title}</h2>
      <p>ID: ${id}</p>
      <p>Tags: ${tags}</p>
      <p>userId: ${userId}</p>
    </li>`
        )
        .join("");
      filteredPosts.insertAdjacentHTML("beforeend", markup);
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
    const markup = posts
      .map(
        ({ id, title, tags }) =>
          `<li class="posts-item">
      <h2>Title: ${title}</h2>
      <p>ID: ${id}</p>
      <p>Tags: ${tags}</p>
       <button type="button" data-id = ${id} class="changeBtn">Change the post</button>
    </li>`
      )
      .join("");
    allPosts.insertAdjacentHTML("beforeend", markup);
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
    changingPostForm.addEventListener("submit", (event) => {
      event.preventDefault();
      changePost(id, obj)
        .then((post) => console.log(post))
        .catch((error) => console.log(error));
    });
  }
}

// console.dir(event.target);
// const markup =
//   '';
// body.insertAdjacentHTML("beforeend", markup);
