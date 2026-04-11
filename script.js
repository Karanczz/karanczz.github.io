let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  let currentScroll = window.pageYOffset;

  // always show at top
  if (currentScroll <= 0) {
    header.style.transform = "translateY(0)";
    header.classList.remove("sticky");
    return;
  }

  // add sticky effect
  header.classList.toggle("sticky", currentScroll > 100);

  // scroll down → hide navbar
  if (currentScroll > lastScroll) {
    header.style.transform = "translateY(-100%)";
  } 
  // scroll up → show navbar
  else {
    header.style.transform = "translateY(0)";
  }

  lastScroll = currentScroll;
});
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
const menuIcon = document.getElementById("menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  navbar.classList.toggle("active");
};
document.querySelectorAll(".navbar a").forEach(link => {
  link.onclick = () => {
    navbar.classList.remove("active");
  };
});
const roles = ["Frontend Developer", "UI Designer", "Web Creator"];
let i = 0;
let j = 0;
let current = "";
let isDeleting = false;

function typeEffect() {
  const text = roles[i];

  if (!isDeleting) {
    current = text.substring(0, j++);
  } else {
    current = text.substring(0, j--);
  }

  document.querySelector(".role span").textContent = current;

  if (!isDeleting && j === text.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1000);
    return;
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % roles.length;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();