document.addEventListener("DOMContentLoaded", function(){

const cards = document.querySelectorAll(".product-card");
const modal = document.getElementById("productModal");

const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");

const closeBtn = document.querySelector(".close");

const sizeBlock = document.getElementById("sizeBlock");
const colorBlock = document.getElementById("colorBlock");

const cart = document.getElementById("floatingCart");
const cartCount = document.getElementById("cartCount");

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];


/* PRODUCT CLICK */

cards.forEach(card=>{

card.onclick=()=>{

modalImg.src = card.querySelector("img").src;
modalTitle.innerText = card.querySelector("h4").innerText;
modalPrice.innerText = card.querySelector("p").innerText;

const hasSize = card.dataset.size==="true";
const hasColor = card.dataset.color==="true";

sizeBlock.style.display = hasSize ? "block":"none";
colorBlock.style.display = hasColor ? "block":"none";

/* reset size */

document.querySelectorAll(".size-options button").forEach(b=>{
b.classList.remove("active");
});

/* reset color */

document.querySelectorAll(".color").forEach(c=>{
c.classList.remove("active");
});
const colorContainer = document.querySelector(".color-options");
colorContainer.innerHTML = "";

if(card.dataset.colors){

const colors = card.dataset.colors.split(",");

colors.forEach(c=>{

const span = document.createElement("span");

span.classList.add("color",c);

span.onclick=()=>{

document.querySelectorAll(".color").forEach(x=>x.classList.remove("active"));

span.classList.add("active");

};

colorContainer.appendChild(span);

});

}
modal.style.display="flex";

}

})


/* CLOSE MODAL */

closeBtn.onclick=()=>modal.style.display="none";

window.onclick=(e)=>{
if(e.target==modal){
modal.style.display="none";
}
}
/* SIZE SELECT */

const sizes = document.querySelectorAll(".size-options button");

sizes.forEach(btn => {

btn.addEventListener("click",(e)=>{

e.stopPropagation();

sizes.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

/* CHANGE PRICE */

const newPrice = btn.dataset.price;

modalPrice.innerText = "RM" + newPrice;

});

});
/* COLOR SELECT */

const colors = document.querySelectorAll(".color");

colors.forEach(color => {

color.addEventListener("click", ()=>{

colors.forEach(c => c.classList.remove("active"));

color.classList.add("active");

});

});


/* ADD TO CART */

const addBtn=document.querySelector(".add-cart");
const cartError=document.getElementById("cartError");

addBtn.onclick=()=>{
cartError.innerText="";
const qty=parseInt(document.querySelector(".quantity input").value)||1;

const title=modalTitle.innerText;
const price=parseInt(modalPrice.innerText.replace("RM",""));

let size = "";
let color = "";

const activeSize = document.querySelector(".size-options button.active");
if(activeSize){
size = activeSize.innerText;
}

const activeColor = document.querySelector(".color.active");
if(activeColor){
color = activeColor.classList[1].toUpperCase();
}

/* CHECK SIZE REQUIRED */

if(sizeBlock.style.display==="block" && !activeSize){

cartError.innerText="Please select size";

return;

}

if(colorBlock.style.display==="block" && !activeColor){

cartError.innerText="Please select color";

return;

}

/* CHECK SAME PRODUCT */

const existing = cartItems.find(item=>

item.title===title &&
item.size===size &&
item.color===color

);

if(existing){

existing.qty += qty;

}else{

cartItems.push({title,price,qty,size,color});

}

localStorage.setItem("cartItems",JSON.stringify(cartItems));

updateCart();

modal.style.display="none";

}


/* CART */

const cartModal=document.getElementById("cartModal");

cart.onclick=()=>{

cartModal.style.display="flex";

}


/* UPDATE CART */

function updateCart(){

const cartItemsDiv=document.getElementById("cartItems");
const cartTotal=document.getElementById("cartTotal");

cartItemsDiv.innerHTML="";

/* SORT BY NAME */

cartItems.sort((a,b)=>a.title.localeCompare(b.title));

let total=0;
let count=0;

cartItems.forEach((item,index)=>{

total+=item.price*item.qty;
count+=item.qty;

const div=document.createElement("div");

div.classList.add("cart-item");

div.innerHTML=`

<span class="cart-name">

${item.title}

${item.size ? "<br>Size: "+item.size : ""}

${item.color ? "<br>Color: "+item.color : ""}

</span>

<div class="cart-qty">

<button class="qty-minus" data-index="${index}">−</button>

<span>${item.qty}</span>

<button class="qty-plus" data-index="${index}">+</button>

</div>

<span class="cart-price">RM${item.price*item.qty}</span>

<span class="cart-remove" data-index="${index}">✕</span>

`;

cartItemsDiv.appendChild(div);

});


cartTotal.innerText=total;
cartCount.innerText=count;


/* REMOVE ITEM */

document.querySelectorAll(".cart-remove").forEach(btn=>{

btn.onclick=()=>{

cartItems.splice(btn.dataset.index,1);

localStorage.setItem("cartItems",JSON.stringify(cartItems));

updateCart();

}

});


/* PLUS */

document.querySelectorAll(".qty-plus").forEach(btn=>{

btn.onclick=()=>{

cartItems[btn.dataset.index].qty++;

localStorage.setItem("cartItems",JSON.stringify(cartItems));

updateCart();

}

});


/* MINUS */

document.querySelectorAll(".qty-minus").forEach(btn=>{

const index = btn.dataset.index;

btn.onclick=()=>{

if(cartItems[index].qty>1){

cartItems[index].qty--;

}else{

cartItems.splice(index,1);

}

localStorage.setItem("cartItems",JSON.stringify(cartItems));

updateCart();

}

});

}

updateCart();



/* CHECKOUT WHATSAPP */

const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.onclick=()=>{

const user=JSON.parse(localStorage.getItem("user"));

if(!user){

alert("Please login before checkout");

window.location.href="login.html";

return;

}

let message="Order from Success Gents\n\n";

cartItems.forEach(item=>{
message+=`${item.title}\n`;

if(item.size){
message+=`Size: ${item.size}\n`;
}

if(item.color){
message+=`Color: ${item.color}\n`;
}

message+=`Qty: ${item.qty}\n`;
message+=`Price: RM${item.price*item.qty}\n\n`;
});

let total=cartItems.reduce((sum,i)=>sum+i.price*i.qty,0);

message+=`\nTotal: RM${total}\n\n`;

message+=`Customer:\n`;
message+=`Name: ${user.name}\n`;
message+=`Address: ${user.address}`;

const url="https://wa.me/60122121721?text="+encodeURIComponent(message);

window.location.href = url;

/* CLEAR CART AFTER CHECKOUT */

cartItems=[];
localStorage.removeItem("cartItems");

updateCart();

}



/* FILTER SYSTEM */

const categoryBtns = document.querySelectorAll(".categories li");
const searchInput = document.getElementById("search");

let currentCategory = "all";

function filterProducts(){

const searchValue = searchInput.value.toLowerCase();

cards.forEach(card=>{

const name = card.querySelector("h4").innerText.toLowerCase();
const category = card.dataset.category;

const matchCategory =
currentCategory === "all" || category === currentCategory;

const matchSearch =
name.includes(searchValue);

if(matchCategory && matchSearch){

card.style.display = "block";

}else{

card.style.display = "none";

}

});

}


/* CATEGORY CLICK */

categoryBtns.forEach(btn=>{

btn.onclick=()=>{

categoryBtns.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

currentCategory = btn.dataset.category;

filterProducts();

}

});


/* SEARCH */

searchInput.addEventListener("input",filterProducts);

const closeCart = document.getElementById("closeCart");

closeCart.onclick = ()=>{

cartModal.style.display="none";

}

window.onclick = function(e){

if(e.target == cartModal){

cartModal.style.display = "none";

}

}
const page = window.location.pathname.split("/").pop();

if(page === "shop.html"){

document.querySelectorAll(".menu a").forEach(link=>{

if(link.getAttribute("href") === "shop.html"){

link.classList.add("active");

}

});

}
});

