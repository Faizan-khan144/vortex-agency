const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });

reveals.forEach(item => revealObserver.observe(item));

const counters = document.querySelectorAll(".ach-num");

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = +counter.dataset.target;

    let count = 0;
    const step = target / 100;

    const update = () => {
      count += step;

      if (count < target) {
        counter.textContent = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    update();
    counterObserver.unobserve(counter);
  });
});

counters.forEach(counter => counterObserver.observe(counter));

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    button.classList.add("active");

    const filter = button.dataset.filter;

    portfolioCards.forEach(card => {
      if (filter === "all" || card.dataset.cat === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

const testimonials = document.querySelectorAll(".testimonial-card");
const dotsContainer = document.getElementById("testDots");
const prevBtn = document.getElementById("prevTest");
const nextBtn = document.getElementById("nextTest");

let currentTestimonial = 0;

testimonials.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");

  if (index === 0) dot.classList.add("active");

  dot.addEventListener("click", () => showTestimonial(index));

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function showTestimonial(index) {
  testimonials.forEach(card => card.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));

  testimonials[index].classList.add("active");
  dots[index].classList.add("active");

  currentTestimonial = index;
}

nextBtn.addEventListener("click", () => {
  let next = currentTestimonial + 1;

  if (next >= testimonials.length) next = 0;

  showTestimonial(next);
});

prevBtn.addEventListener("click", () => {
  let prev = currentTestimonial - 1;

  if (prev < 0) prev = testimonials.length - 1;

  showTestimonial(prev);
});

setInterval(() => {
  let next = currentTestimonial + 1;

  if (next >= testimonials.length) next = 0;

  showTestimonial(next);
}, 5000);

const form = document.getElementById("contactForm");
const success = document.getElementById("formSuccess");

form.addEventListener("submit", e => {
  e.preventDefault();

  success.classList.add("show");

  form.reset();

  setTimeout(() => {
    success.classList.remove("show");
  }, 4000);
});

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

const canvas = document.getElementById("gridCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(255,255,255,0.05)";

    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    requestAnimationFrame(drawGrid);
  }

  drawGrid();
}