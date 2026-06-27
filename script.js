/* =========================================
   PORTFOLIO WEBSITE JAVASCRIPT
   Bhavesh Gurrap Portfolio
========================================= */

/* =========================================
   DOM ELEMENTS
========================================= */

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

const backToTop = document.getElementById("backToTop");

const progressBars = document.querySelectorAll(".progress-fill");

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const statNumbers = document.querySelectorAll(".stat-card h3");

const revealElements = document.querySelectorAll(
    ".timeline-item, .project-card, .experience-card, .education-card, .highlight-card, .certificate-card, .skill-category, .stat-card"
);

/* =========================================
   MOBILE MENU
========================================= */

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navLinks.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}

/* =========================================
   CLOSE MENU ON CLICK
========================================= */

navItems.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuToggle?.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

});

/* =========================================
   DARK / LIGHT THEME
========================================= */

function loadTheme() {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {

        body.classList.add("light-theme");

        if (themeToggle) {

            themeToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        }

    }

}

loadTheme();

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        body.classList.toggle("light-theme");

        const isLight =
            body.classList.contains("light-theme");

        if (isLight) {

            localStorage.setItem("theme", "light");

            themeToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        } else {

            localStorage.setItem("theme", "dark");

            themeToggle.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

        }

    });

}

/* =========================================
   ACTIVE NAVIGATION
========================================= */

function activateNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        const sectionHeight =
            section.clientHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}

/* =========================================
   BACK TO TOP BUTTON
========================================= */

function handleBackToTop() {

    if (window.scrollY > 600) {

        backToTop?.classList.add("show");

    } else {

        backToTop?.classList.remove("show");

    }

}

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}

/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const header = document.querySelector(".header");

function navbarScrollEffect() {

    if (!header) return;

    if (window.scrollY > 80) {

        header.style.background =
            "rgba(8,17,31,0.92)";

        header.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.25)";

    } else {

        header.style.background =
            "rgba(8,17,31,.75)";

        header.style.boxShadow = "none";

    }

}

/* =========================================
   PROGRESS BAR ANIMATION
========================================= */

let progressAnimated = false;

function animateProgressBars() {

    const skillsSection =
        document.querySelector("#skills");

    if (!skillsSection) return;

    const triggerPoint =
        skillsSection.offsetTop - 400;

    if (
        window.scrollY > triggerPoint &&
        !progressAnimated
    ) {

        progressBars.forEach(bar => {

            const width =
                bar.getAttribute("data-width");

            bar.style.width = width + "%";

        });

        progressAnimated = true;

    }

}

/* =========================================
   SCROLL REVEAL
========================================= */

function revealOnScroll() {

    const triggerBottom =
        window.innerHeight * 0.88;

    revealElements.forEach(element => {

        const top =
            element.getBoundingClientRect().top;

        if (top < triggerBottom) {

            element.classList.add("reveal");
            element.classList.add("active");

        }

    });

}

revealOnScroll();

/* =========================================
   COUNTER ANIMATION
========================================= */

let counterStarted = false;

function animateCounter(
    element,
    target,
    duration = 1800
) {

    let start = 0;

    const increment =
        target / (duration / 16);

    function updateCounter() {

        start += increment;

        if (start < target) {

            element.innerText =
                Math.floor(start);

            requestAnimationFrame(updateCounter);

        } else {

            element.innerText = target;

        }

    }

    updateCounter();

}

function startCounters() {

    const aboutSection =
        document.querySelector("#about");

    if (!aboutSection) return;

    const trigger =
        aboutSection.offsetTop - 350;

    if (
        window.scrollY > trigger &&
        !counterStarted
    ) {

        statNumbers.forEach(card => {

            const text =
                card.innerText;

            const value =
                parseInt(text.replace(/\D/g, ""));

            if (!isNaN(value)) {

                animateCounter(card, value);

            }

        });

        counterStarted = true;

    }

}

/* =========================================
   SMOOTH SCROLL
========================================= */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target =
            document.querySelector(
                this.getAttribute("href")
            );

        if (!target) return;

        e.preventDefault();

        window.scrollTo({

            top:
                target.offsetTop - 70,

            behavior: "smooth"

        });

    });

});

/* =========================================
   FLOATING DASHBOARD EFFECT
========================================= */

const dashboardCards =
document.querySelectorAll(".dashboard-card");

dashboardCards.forEach((card, index) => {

    card.addEventListener("mousemove", e => {

        const rect =
            card.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        const rotateY =
            (x - rect.width / 2) / 15;

        const rotateX =
            -(y - rect.height / 2) / 15;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0)";

    });

});

/* =========================================
   PROJECT CARD HOVER GLOW
========================================= */

const projectCards =
document.querySelectorAll(".project-card");

projectCards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect =
            card.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        card.style.background =
            `
            radial-gradient(
                circle at ${x}px ${y}px,
                rgba(18,209,142,.12),
                rgba(255,255,255,.04)
            )
            `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.background = "";

    });

});

/* =========================================
   GLOBAL SCROLL EVENTS
========================================= */

window.addEventListener("scroll", () => {

    activateNavigation();

    handleBackToTop();

    navbarScrollEffect();

    animateProgressBars();

    revealOnScroll();

    startCounters();

});

/* =========================================
   INITIAL LOAD
========================================= */

window.addEventListener("load", () => {

    activateNavigation();

    navbarScrollEffect();

    animateProgressBars();

    revealOnScroll();

    startCounters();

});

/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "%cBhavesh Gurrap Portfolio Loaded Successfully",
    "color:#12d18e;font-size:14px;font-weight:bold;"
);

/* =========================================
   EMAILJS CONTACT FORM
========================================= */

// Load EmailJS SDK
(function () {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = function () {
        emailjs.init("Y5kjW0bSlaKTvPzLM");
    };
    document.head.appendChild(script);
})();

const cfSubmit   = document.getElementById("cf-submit");
const cfFeedback = document.getElementById("cf-feedback");
const cfName     = document.getElementById("cf-name");
const cfEmail    = document.getElementById("cf-email");
const cfSubject  = document.getElementById("cf-subject");
const cfMessage  = document.getElementById("cf-message");

function showFeedback(type, msg) {
    cfFeedback.className  = "cf-feedback " + type;
    cfFeedback.innerHTML  = msg;
    cfFeedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (cfSubmit) {

    cfSubmit.addEventListener("click", function () {

        const name    = cfName.value.trim();
        const email   = cfEmail.value.trim();
        const subject = cfSubject.value.trim() || "No Subject";
        const message = cfMessage.value.trim();

        // — Validation —
        if (!name) {
            showFeedback("error", "⚠️ Please enter your name.");
            cfName.focus();
            return;
        }

        if (!email || !isValidEmail(email)) {
            showFeedback("error", "⚠️ Please enter a valid email address.");
            cfEmail.focus();
            return;
        }

        if (!message) {
            showFeedback("error", "⚠️ Please enter your message.");
            cfMessage.focus();
            return;
        }

        // — Sending state —
        cfSubmit.disabled     = true;
        cfSubmit.innerHTML    =
            '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        cfFeedback.className  = "cf-feedback";

        const templateParams = {
            name       : name,
            from_email : email,
            subject    : subject,
            message    : message
        };

        emailjs
            .send("service_lypgkqa", "template_w7sgv07", templateParams)
            .then(function () {

                showFeedback(
                    "success",
                    "✅ Message sent successfully! I'll get back to you soon."
                );

                // Reset form
                cfName.value    = "";
                cfEmail.value   = "";
                cfSubject.value = "";
                cfMessage.value = "";

                cfSubmit.disabled  = false;
                cfSubmit.innerHTML =
                    '<i class="fa-solid fa-paper-plane"></i> Send Message';

            })
            .catch(function (error) {

                console.error("EmailJS error:", error);

                showFeedback(
                    "error",
                    "❌ Something went wrong. Please try again or email me directly at bhaveshgurrap11@gmail.com"
                );

                cfSubmit.disabled  = false;
                cfSubmit.innerHTML =
                    '<i class="fa-solid fa-paper-plane"></i> Send Message';

            });

    });

}

/* =========================================
   CUSTOM CURSOR
========================================= */

const cursorDot  = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");

window.addEventListener("mousemove", function(e){

    const x = e.clientX;
    const y = e.clientY;

    // Dot follows instantly
    cursorDot.style.left = x + "px";
    cursorDot.style.top  = y + "px";

    // Ring follows with slight delay (handled by CSS transition)
    cursorRing.style.left = x + "px";
    cursorRing.style.top  = y + "px";

});

// Grow ring on hover over links & buttons
document.querySelectorAll("a, button").forEach(el => {

    el.addEventListener("mouseenter", () => {

        cursorRing.style.width       = "50px";
        cursorRing.style.height      = "50px";
        cursorRing.style.borderColor = "var(--accent-blue)";
        cursorDot.style.transform    =
            "translate(-50%, -50%) scale(1.5)";

    });

    el.addEventListener("mouseleave", () => {

        cursorRing.style.width       = "35px";
        cursorRing.style.height      = "35px";
        cursorRing.style.borderColor =
            "rgba(18,209,142,0.5)";
        cursorDot.style.transform    =
            "translate(-50%, -50%) scale(1)";

    });

});

// Hide cursor when mouse leaves window
document.addEventListener("mouseleave", () => {
    cursorDot.style.opacity  = "0";
    cursorRing.style.opacity = "0";
});

document.addEventListener("mouseenter", () => {
    cursorDot.style.opacity  = "1";
    cursorRing.style.opacity = "1";
});