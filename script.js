// simple form message

document.addEventListener("DOMContentLoaded", function(){

const form = document.querySelector("form");

if(form){

form.addEventListener("submit", function(e){

e.preventDefault();

alert("Thank you! Your information has been received. We will contact you via WhatsApp soon.");

form.reset();

});

}

});