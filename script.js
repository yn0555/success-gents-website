document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector("#partner form");
  const clearBtn = document.getElementById("clearForm");

  // Submit alert
  if (form) {
    form.addEventListener("submit", function () {
      alert("Thank you! We will contact you via WhatsApp soon.");
    });
  }

  // Clear button
  if (clearBtn && form) {
    clearBtn.addEventListener("click", function () {
      form.reset();
    });
  }

  // Reveal animation
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.88;

    reveals.forEach(function (item) {
      const boxTop = item.getBoundingClientRect().top;

      if (boxTop < triggerBottom) {
        item.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
/* NAV SCROLL SPY */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".menu a");

function updateNav(){

let scrollY = window.pageYOffset;

sections.forEach(section=>{

const sectionTop = section.offsetTop - 150;
const sectionHeight = section.offsetHeight;
const sectionId = section.getAttribute("id");

if(scrollY >= sectionTop && scrollY < sectionTop + sectionHeight){

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href") === "#" + sectionId){
link.classList.add("active");
}

});

}

});

}

/* RUN */

window.addEventListener("scroll", updateNav);

/* RUN ON PAGE LOAD */

updateNav();
});

