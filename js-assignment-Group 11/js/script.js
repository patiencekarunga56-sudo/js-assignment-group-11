const products = [
  { id: 1, name: "Samsung Phone",    price: 850000,  category: "Electronics", image:"Images/phones.jpg" },
  { id: 2, name: "HP Laptop",        price: 2200000, category: "Electronics", image: "Images/laptop.jpg" },
  { id: 3, name: "Wireless Earbuds", price: 120000,  category: "Electronics", image: "Images/headphones.jpg" },
  { id: 4, name: "Men's Sneakers",   price: 95000,   category: "Fashion",     image: "Images/sneakers.webp" },
  { id: 5, name: "Ladies Dress",     price: 75000,   category: "Fashion",     image: "Images/dress.webp" },
  { id: 6, name: "Leather Handbag",  price: 130000,  category: "Fashion",     image: "Images/hand bag.webp" },
  { id: 7, name: "JS for Beginners", price: 45000,   category: "Books",       image: "Images/js book.webp" },
  { id: 8, name: "Business Book",    price: 38000,   category: "Books",       image: "Images/book.webp" },
  { id: 9, name: "Electric Kettle",  price: 65000,   category: "Home",        image: "Images/kettle.jpg" },
  { id: 10, name: "Wall Clock",      price: 42000,   category: "Home",        image: "Images/clock.jpg" }
];
let selectedCategory = "All";

//function to Read the cart from localStorage
function getCart() {
  try {
    let saved = localStorage.getItem("cart");
    if (saved === null) {
      return [];
    }
    return JSON.parse(saved);
  } catch (error) {
    console.log("Error reading cart: " + error);
    return [];
  }
}

//a function to Save the cart to localStorage
function saveCart(cart) {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.log("Error saving cart: " + error);
  }
}
function getCartCount() {
  let cart = getCart();
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].quantity;
  }
  return total;
}

//a function to Format a number as UGX currency 
function formatPrice(amount) {
  return "UGX " + amount.toLocaleString();
}

//a function to updates the number shown next to "Cart" in the navbar
function updateCartBadge() {
  let badge = document.getElementById("cart-count");
  if (badge !== null) {
    badge.textContent = getCartCount();
  }
}
//Show Product Cards
function showProducts(list) {
  let grid = document.getElementById("product-grid");
  let noResults = document.getElementById("no-results");

  if (grid === null) return;

  grid.innerHTML = "";
 
  for (let i = 0; i < list.length; i++) {
    let product = list[i];
    let card = document.createElement("div");
    card.className = "product-card";

  
    card.innerHTML =
  "<div class='product-image'><img src='" + product.image + "' alt='" + product.name + "' /></div>" +
  "<span class='product-cat'>" + product.category + "</span>" +
  "<h3>" + product.name + "</h3>" +
  "<p class='product-price'>" + formatPrice(product.price) + "</p>" +
  "<button class='add-btn' data-id='" + product.id + "'>Add to Cart</button>";

    grid.appendChild(card);
  }
  let buttons = document.querySelectorAll(".add-btn");
  for (let b = 0; b < buttons.length; b++) {
    buttons[b].addEventListener("click", function() {
      let productId = parseInt(this.getAttribute("data-id"));
      addToCart(productId);

      //this is used to Change button text briefly to confirm
      this.textContent = "Added!";
      let btn = this;
      setTimeout(function() {
        btn.textContent = "Add to Cart";
      }, 1200);
    });
  }
}
//a function to add product to cart
function addToCart(productId) {
  try {
    let product = null;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
        product = products[i];
      }
    }

    if (product === null) return;
    let cart = getCart();

    //this code Checks if this product is already in the cart
    let found = false;
    for (let j = 0; j < cart.length; j++) {
      if (cart[j].id === productId) {
        cart[j].quantity = cart[j].quantity + 1;
        found = true;
      }
    }

    //this adds an item to cart if not found, add it as a new item
    if (found === false) {
      cart.push({
        id:       product.id,
        name:     product.name,
        price:    product.price,
        Image:    product.Image,
        quantity: 1
      });
    }
    saveCart(cart);
    //this is to update the cart number in the navbar
    updateCartBadge();
  } catch (error) {
    alert("Something went wrong adding to cart: " + error);
  }
}
//a function to filter items
function searchProducts() {
  let searchBox = document.getElementById("search-input");
  if (searchBox === null) return;
  let query = searchBox.value.toLowerCase();
  //this code is to Filter products that match the search AND selected category
  let results = [];
  for (let i = 0; i < products.length; i++) {
    let nameMatch     = products[i].name.toLowerCase().indexOf(query) !== -1;
    let categoryMatch = (selectedCategory === "All") || (products[i].category === selectedCategory);
    if (nameMatch && categoryMatch) {
      results.push(products[i]);
    }
  }
   showProducts(results);
}

//filter products by there catergory 
function filterByCategory(category) {
  selectedCategory = category;

  //this removes "active" class from all buttons, add it to the clicked one
  let buttons = document.querySelectorAll(".filter-btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].className = "filter-btn";
  }
  let allBtns = document.querySelectorAll(".filter-btn");
  for (let j = 0; j < allBtns.length; j++) {
    if (allBtns[j].textContent === category) {
      allBtns[j].className = "filter-btn active";
    }
  }
  searchProducts();
}


function showCart() {
  let cartList    = document.getElementById("cart-list");
  let emptyMsg    = document.getElementById("empty-message");
  let cartSummary = document.getElementById("cart-summary");
  if (cartList === null) return;

  let cart = getCart();

  cartList.innerHTML = "";
// If cart is empty
  if (cart.length === 0) {
    emptyMsg.style.display    = "block";
    cartSummary.style.display = "none";
    retu
  rn;
  }

  // Cart has items show summary
  emptyMsg.style.display    = "none";
  cartSummary.style.display = "block";
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let row = document.createElement("div");
    row.className = "cart-item";

    //the innerHTML fills the row with the item details
    row.innerHTML =
      "<div class='cart-item-left'>" +
        "<div class='cart-item-image'>" + item.image + "</div>" +
        "<div>" +
          "<p class='cart-item-name'>" + item.name + "</p>" +
          "<p class='cart-item-price'>" + formatPrice(item.price) + " each</p>" +
        "</div>" +
      "</div>" +
      "<div class='qty-controls'>" +
        "<button class='qty-btn' data-id='" + item.id + "' data-action='decrease'>-</button>" +
        "<span class='qty-number'>" + item.quantity + "</span>" +
        "<button class='qty-btn' data-id='" + item.id + "' data-action='increase'>+</button>" +
      "</div>" +
      "<button class='remove-btn' data-id='" + item.id + "'>Remove</button>";
    cartList.appendChild(row);
  }
  let qtyBtns = document.querySelectorAll(".qty-btn");
  for (let q = 0; q < qtyBtns.length; q++) {
    qtyBtns[q].addEventListener("click", function() {
      let id     = parseInt(this.getAttribute("data-id"));
      let action = this.getAttribute("data-action");
      changeQuantity(id, action);
    });
  }
  let removeBtns = document.querySelectorAll(".remove-btn");
  for (let r = 0; r < removeBtns.length; r++) {
    removeBtns[r].addEventListener("click", function() {
      let id = parseInt(this.getAttribute("data-id"));
      removeFromCart(id);
    });
  }
  updateTotals(cart);
}

//a function to change quantity
function changeQuantity(productId, action) {
  try {
    let cart = getCart();

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === productId) {
        if (action === "increase") {
          cart[i].quantity = cart[i].quantity + 1;
        } else if (action === "decrease") {
          cart[i].quantity = cart[i].quantity - 1;
        }
        if (cart[i].quantity <= 0) {
          cart.splice(i, 1);
        }
        break;
      }
    }

    saveCart(cart);
    showCart();        // Redraws the cart
    updateCartBadge(); // Updates navbar number

  } catch (error) {
    alert("Error changing quantity: " + error);
  }
}
//removing items from the cart
function removeFromCart(productId) {
  try {
    let cart = getCart();
    let newCart = [];
    //this keeps every item except the one being removed
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id !== productId) {
        newCart.push(cart[i]);
      }
    }
    saveCart(newCart);
    showCart();
    updateCartBadge();
  } catch (error) {
    alert("Error removing item: " + error);
  }
}
//this updates the total in the cart
function updateTotals(cart) {
  let totalItems = 0;
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalItems = totalItems + cart[i].quantity;
    totalPrice = totalPrice + (cart[i].price * cart[i].quantity);
  }
  document.getElementById("total-items").textContent = totalItems;
  document.getElementById("total-price").textContent = formatPrice(totalPrice);
}
//this shows shows the order summary
function showOrderSummary() {
  let orderList  = document.getElementById("order-list");
  let orderTotal = document.getElementById("order-total");
  if (orderList === null) return;
  let cart = getCart();
  orderList.innerHTML = "";

  if (cart.length === 0) {
    orderList.innerHTML = "<p style='color:gray;'>No items in cart.</p>";
    orderTotal.textContent = formatPrice(0);
    return;
  }
  let grandTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    let lineTotal = cart[i].price * cart[i].quantity;
    grandTotal = grandTotal + lineTotal;
    // createElement makes a row for each item
    let row = document.createElement("div");
    row.className = "order-item-row";
    row.innerHTML =
      "<span>" + cart[i].Image + " " + cart[i].name + " x" + cart[i].quantity + "</span>" +
      "<span>" + formatPrice(lineTotal) + "</span>";
    orderList.appendChild(row);
  }
  orderTotal.textContent = formatPrice(grandTotal);
}
//this is for validation of the checkout form
function setupCheckoutForm() {
  let placeOrderBtn = document.getElementById("place-order-btn");
  if (placeOrderBtn === null) return;
  placeOrderBtn.addEventListener("click", function() {
    try {
      let name    = document.getElementById("name").value.trim();
      let email   = document.getElementById("email").value.trim();
      let phone   = document.getElementById("phone").value.trim();
      let address = document.getElementById("address").value.trim();
      let errorMsg   = document.getElementById("error-msg");
      let successMsg = document.getElementById("success-msg");

      errorMsg.style.display   = "none";
      successMsg.style.display = "none";

      let cart = getCart();
      if (cart.length === 0) {
        throw new Error("Your cart is empty! Add items before checking out.");
      }
//this is to check if all filled in
      if (name === "" || email === "" || phone === "" || address === "") {
        throw new Error("Please fill in all fields.");
      }
      if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        throw new Error("Please enter a valid email address.");
      }
      if (phone.length !== 10 || isNaN(phone)) {
        throw new Error("Phone number must be exactly 10 digits.");
      }
 //this is to Calculate grand total
    let total = 0;
      for (let i = 0; i < cart.length; i++) {
        total = total + (cart[i].price * cart[i].quantity);
      }
      successMsg.innerHTML =
        "Order placed successfully! Thank you, " + name + ".<br>" +
        "Total: " + formatPrice(total) + "<br>" +
        "We will deliver to: " + address;
      successMsg.style.display = "block";
      // Clear the cart after order
      localStorage.removeItem("cart");
      updateCartBadge();
      showOrderSummary();
      // Clear the form fields
      document.getElementById("name").value    = "";
      document.getElementById("email").value   = "";
      document.getElementById("phone").value   = "";
      document.getElementById("address").value = "";
    } catch (error) {
      var errorMsg = document.getElementById("error-msg");
      errorMsg.textContent   = error.message;
      errorMsg.style.display = "block";
    }
  });
}
//search and filter buttons
function setupHomePage() {
  if (document.getElementById("product-grid") === null) return;
  showProducts(products);
  let searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", function() {
    searchProducts();
  });
  // Filter buttons  each button calls filterByCategory with its name
  document.getElementById("btn-all").addEventListener("click",         function() { filterByCategory("All");         });
  document.getElementById("btn-electronics").addEventListener("click", function() { filterByCategory("Electronics"); });
  document.getElementById("btn-fashion").addEventListener("click",     function() { filterByCategory("Fashion");     });
  document.getElementById("btn-books").addEventListener("click",       function() { filterByCategory("Books");       });
  document.getElementById("btn-home").addEventListener("click",        function() { filterByCategory("Home");        });
  // Set "All" button as active by default
  document.getElementById("btn-all").className = "filter-btn active";
}
//updates cart on every page
updateCartBadge();
// Home pages setup
setupHomePage();
// Cart pages setup
showCart();
// Checkouts page setup
showOrderSummary();
setupCheckoutForm();


