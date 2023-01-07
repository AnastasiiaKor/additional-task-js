function allProductsMarkup(products) {
  return products
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
}
function productMarkup(product) {
  const { title, thumbnail, brand, description, price } = product;
  return `<h2>${title}</h2>
          <img src="${thumbnail}" alt="${title}" load=lazy width='300'/>
        <p><b> Brand: ${brand}</b></p>
          <p>Description: ${description}.</p>
          <span>Price: ${price}.</span>`;
}
function addedProductMarkup(addedProduct) {
  return `<h2>${addedProduct.title}</h2><span>ID: ${addedProduct.id}.</span><p>Description: ${addedProduct.description}.</p>
           <span>Price: ${addedProduct.price}.</span>`;
}
function usersMarkup(users) {
  return users
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
}
function userCartsMarkup(products) {
  return products
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
}
function userPostsMarkup(userPosts) {
  return userPosts
    .map(
      ({ id, title, tags }) =>
        `<li class="posts-item">
      <h2>Title: ${title}</h2>
      <p>ID: ${id}</p>
      <p>Tags: ${tags}</p>
    </li>`
    )
    .join("");
}
function newUserMarkup(newUser) {
  return `<p><b>Fisrt Name:</b> ${newUser.firstName}</p>
      <p><b>Last Name:</b>  ${newUser.lastName}</p>
      <p><b>ID:</b> ${newUser.id}</p>
      <p><b>Email:</b> ${newUser.email}</p>`;
}
function keywordPostsMarkup(posts) {
  return posts
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
}
function allPostsMarkup(posts) {
  return posts
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
}
function changedPostMarkup(post) {
  const { title, tags, id } = post;
  return `<h2>Title: ${title}</h2>
      <p>ID: ${id}</p>
      <p>Tags: ${tags}</p>
       <button type="button" data-id = ${id} class="changeBtn">Change the post</button>
    `;
}
export {
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
};
