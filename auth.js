function signup(){

const user = {
name:document.getElementById("name").value,
address:document.getElementById("address").value,
email:document.getElementById("email").value,
password:document.getElementById("password").value
};

localStorage.setItem("user",JSON.stringify(user));

alert("Account created!");

window.location.href="login.html";

}



function login(){

const saved = JSON.parse(localStorage.getItem("user"));

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

if(saved && saved.email === email && saved.password === password){

alert("Login successful");

window.location.href="shop.html";

}else{

alert("Wrong email or password");

}

}