const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

// Add an active class on the hamburger and nav-menu classes
// This makes the mobile menu open

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));


// Remove the active class from both the nav-menu and the hamburger
// This makes the mobile menu close

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}