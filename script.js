/* ----------------------------------------------------
   REVEAL ON SCROLL
---------------------------------------------------- */
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
    revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/* ----------------------------------------------------
   SCROLL PROGRESS BAR
---------------------------------------------------- */
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    document.getElementById("scroll-progress").style.width = progress + "%";
});


/* ----------------------------------------------------
   NAVBAR SCROLL SHADOW
---------------------------------------------------- */
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


/* ----------------------------------------------------
   NAV ACTIVE LINK ON SCROLL
---------------------------------------------------- */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
    let scrollPos = window.scrollY + 200;

    sections.forEach((sec) => {
        let top = sec.offsetTop;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach((a) => a.classList.remove("active"));
            const link = document.querySelector('.nav-links a[href="#' + id + '"]');
            if (link) link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();


/* ----------------------------------------------------
   COUNTERS ANIMATION
---------------------------------------------------- */
const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function animateCounters() {
    if (counterStarted) return;
    counterStarted = true;

    counters.forEach((counter) => {
        let start = 0;
        let end = parseInt(counter.getAttribute("data-target"));
        let duration = 2500;
        let step = Math.ceil(end / (duration / 16));

        function update() {
            start += step;
            if (start < end) {
                counter.textContent = start;
                requestAnimationFrame(update);
            } else {
                counter.textContent = end;
            }
        }
        update();
    });
}

window.addEventListener("scroll", () => {
    const impactSection = document.querySelector("#impact");
    const rect = impactSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        animateCounters();
    }
});


/* ----------------------------------------------------
   PREMIUM GALLERY SLIDER (AUTO FADE)
---------------------------------------------------- */
let slideIndex = 0;
const slides = document.querySelectorAll(".premium-slide");

function nextSlide() {
    slides.forEach((s) => s.classList.remove("active"));
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
}

setInterval(nextSlide, 4000);


/* ----------------------------------------------------
   MOBILE NAV
---------------------------------------------------- */
const navToggle = document.querySelector(".nav-toggle");
const navLinksContainer = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
    navLinksContainer.classList.toggle("open");
});

// Close menu when clicking a link (mobile UX fix)
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinksContainer.classList.remove("open");
    });
});
