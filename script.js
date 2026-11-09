
// ==============================
// SAJID ABBAS PORTFOLIO
// CINEMATIC JAVASCRIPT
// ==============================

// MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (icon) {
            if (navLinks.classList.contains("active")) {
                icon.classList.replace("fa-bars", "fa-xmark");
                menuBtn.setAttribute("aria-label", "Close navigation");
            } else {
                icon.classList.replace("fa-xmark", "fa-bars");
                menuBtn.setAttribute("aria-label", "Open navigation");
            }
        }
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.replace("fa-xmark", "fa-bars");
            }

            menuBtn.setAttribute("aria-label", "Open navigation");
        });
    });
}


// AUTOMATIC CURRENT YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// PROFILE IMAGE ERROR CHECK

const profileImage = document.querySelector(".profile-photo img");

if (profileImage) {
    profileImage.addEventListener("error", () => {
        console.error("Profile image not found. Check assets/profile.jpg");
    });
}


// RESUME FILE CHECK

const resumeLinks = document.querySelectorAll(
    'a[href="assets/resume.pdf"]'
);

resumeLinks.forEach(link => {
    link.addEventListener("click", () => {
        console.log("Resume download requested.");
    });
});


// ==============================
// CINEMATIC SCROLL ANIMATIONS
// ==============================

document.body.classList.add("cinematic-ready");

const animationElements = document.querySelectorAll(
    ".hero-content, .hero-image, .section-title, " +
    ".about-card, .skill-card, .experience-card, " +
    ".project-card, .contact-details, .contact-form, " +
    ".test-case-container"
);

animationElements.forEach(element => {
    element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12
    });

    animationElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    animationElements.forEach(element => {
        element.classList.add("visible");
    });

}


// ==============================
// BUTTON AND NAVIGATION SOUNDS
// ==============================

let audioContext;

function getAudioContext() {
    const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return null;

    if (!audioContext) {
        audioContext = new AudioContextClass();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    return audioContext;
}


// BUTTON CLICK SOUND

function playClickSound() {

    const context = getAudioContext();
    if (!context) return;

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(700, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
        350,
        context.currentTime + 0.08
    );

    gain.gain.setValueAtTime(0.12, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        context.currentTime + 0.09
    );

    oscillator.start();
    oscillator.stop(context.currentTime + 0.1);
}


// RESUME ZUUUP SOUND

function playResumeSound() {

    const context = getAudioContext();
    if (!context) return;

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.type = "sawtooth";

    oscillator.frequency.setValueAtTime(1000, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
        150,
        context.currentTime + 0.35
    );

    gain.gain.setValueAtTime(0.001, context.currentTime);
    gain.gain.linearRampToValueAtTime(
        0.12,
        context.currentTime + 0.05
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        context.currentTime + 0.4
    );

    oscillator.start();
    oscillator.stop(context.currentTime + 0.4);
}


// APPLY SOUND TO BUTTONS AND LINKS

document.addEventListener("click", function(event) {

    const clickedElement = event.target.closest("a, button");

    if (!clickedElement) return;

    const isResume =
        clickedElement.hasAttribute("download") ||
        clickedElement.href?.toLowerCase().includes(".pdf");

    if (isResume) {
        playResumeSound();
    } else {
        playClickSound();
    }

});


// CONSOLE MESSAGE

console.log("Sajid Abbas Portfolio Loaded Successfully!");
console.log("Cinematic animations enabled.");
console.log("Software Test Engineer | QA Automation");
