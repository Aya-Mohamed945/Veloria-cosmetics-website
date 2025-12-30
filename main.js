//aya's
let welcomeBtn = document.getElementById("wel");
let homeH1 = document.getElementById("h1-home");
welcomeBtn.addEventListener("click", function () {
  let name = prompt("Enter Your Name:");
  // check if the user enter their name or not
  if (name == "") {
    homeH1.innerHTML = "Welcome to you!🌸";
  } else {
    homeH1.innerHTML = "Welcome to you, " + name + "!🌸";
  }
});
// Initialize the element to access them
const modal = document.getElementById("productModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.getElementById("closeModal");

const cards = document.querySelectorAll(".flip-card-inner");
// for loop to access every item in the products page
cards.forEach((card) => {
  card.addEventListener("click", () => {
    modalImg.src = card.dataset.img;
    modalTitle.innerText = card.dataset.title;
    modalTitle.style.color = "rgb(50, 111, 133)";
    modalPrice.innerText = card.dataset.price;
    modalPrice.style.fontWeight = "900";
    modalDescription.innerText = card.dataset.description;
    modal.style.display = "flex";

    //store data in modal buttons

    document.querySelector(".modal-add-to-cart").dataset.title =
      card.dataset.title;
    document.querySelector(".modal-add-to-cart").dataset.price =
      card.dataset.price;
    document.querySelector(".modal-add-to-cart").dataset.img = card.dataset.img;

    document.querySelector(".model-order-now").dataset.title =
      card.dataset.title;
    document.querySelector(".model-order-now").dataset.price =
      card.dataset.price;
    document.querySelector(".model-order-now").dataset.img = card.dataset.img;

    modal.style.display = "flex";
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// cart

// Load cart from localStorage or create empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render Cart Items
function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");

  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">

            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
            </div>

            <div class="quantity">
                <button onclick="decreaseQuantity(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>

            <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        `;

    cartContainer.appendChild(cartItem);
  });

  totalElement.innerText = total.toFixed(2);
  saveCart();
}

// // Increase Quantity
// function increaseQuantity(index) {
//   cart[index].quantity++;
//   renderCart();
// }

// // Decrease Quantity
// function decreaseQuantity(index) {
//   if (cart[index].quantity > 1) {
//     cart[index].quantity--;
//   }
//   renderCart();
// }

// // Remove Item
// function removeItem(index) {
//   cart.splice(index, 1);
//   renderCart();
// }

// Save to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart (call this from product page)
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find((item) => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: parseFloat(price.replace("$", "")),
      image: image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

// ADD TO CART (Button in Modal)
document
  .querySelector(".modal-add-to-cart")
  .addEventListener("click", function () {
    addToCart(this.dataset.title, this.dataset.price, this.dataset.img);
  });

// ORDER NOW → Add + Go to Cart Page
document
  .querySelector(".model-order-now")
  .addEventListener("click", function () {
    addToCart(this.dataset.title, this.dataset.price, this.dataset.img);
    window.location.href = "cart.html";
  });

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("cart-items");
  let total = 0;

  container.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    container.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" />

                <div class="cart-info">
                    <h4>${item.name}</h4>
                    <p>${item.price} EGP</p>

        `;
  });

  document.getElementById("total-price").innerText = total;
}

// Initialize cart display
renderCart();

//  SAVE USER TO LOCALSTORAGE

function registerUser() {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  const confirmPassword = document.getElementById("regConfirm").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return false;
  }

  // Create user object
  const user = {
    name: name,
    email: email,
    password: password,
  };

  // Save user
  localStorage.setItem("veloriaUser", JSON.stringify(user));
  alert("Account created successfully!");

  window.location.href = "login.html";
  return false;
}

//  LOGIN USER
function loginUser() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const user = JSON.parse(localStorage.getItem("veloriaUser"));

  if (!user) {
    alert("No account found. Please register first.");
    return false;
  }

  if (email === user.email && password === user.password) {
    alert("Login successful!");
    window.location.href = "index.html"; // redirect to home
  } else {
    alert("Incorrect email or password.");
  }

  return false;
}

document.addEventListener("DOMContentLoaded", function () {
  const registerBtn = document.getElementById("goRegister");
  if (registerBtn) {
    registerBtn.addEventListener("click", function () {
      window.location.href = "register.html";
    });
  }

  const loginBtn = document.getElementById("goLogin");
  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      window.location.href = "login.html";
    });
  }
});

function sendMessage() {

    //  get data from form
    let messageData = {
        name: document.getElementById("contactName").value,
        email: document.getElementById("contactEmail").value,
        message: document.getElementById("contactMessage").value
    };

    //  send data to server
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/VELORIA website/server.php");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        alert("Message sent successfully!");
        document.getElementById("contactForm").reset();
    };

    xhr.send(JSON.stringify(messageData));

    return false; //  to prevent reload
}

function loadPrices() {
  let xhr = new XMLHttpRequest();

  xhr.onload = function () {
    let arr = JSON.parse(this.responseText);

    let table = "<tr><th>Name</th><th>Description</th><th>Price</th></tr>";
    arr.forEach((product) => {
      table += `<tr><td>${product.name}</td><td>${product.description}</td><td>${product.price}</td></tr>`;
    });

    document.getElementById("productsTable").innerHTML = table;
  };

  xhr.open("GET", "products.json");
  xhr.send();
}
