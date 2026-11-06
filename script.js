
// ==============================
// SAJID ABBAS PORTFOLIO
// JAVASCRIPT
// ==============================

// MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("active")) {
        icon.classList.replace("fa-bars", "fa-xmark");
        menuBtn.setAttribute("aria-label", "Close navigation");
    } else {
        icon.classList.replace("fa-xmark", "fa-bars");
        menuBtn.setAttribute("aria-label", "Open navigation");
    }

});


// CLOSE MENU AFTER NAVIGATION CLICK

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.replace("fa-xmark", "fa-bars");

        menuBtn.setAttribute("aria-label", "Open navigation");

    });

});


// AUTOMATIC CURRENT YEAR

const yearElement = document.getElementById("year");

yearElement.textContent = new Date().getFullYear();


// PROFILE IMAGE ERROR CHECK

const profileImage = document.querySelector(".profile-photo img");

profileImage.addEventListener("error", () => {
    console.error("Profile image not found. Check assets/profile.jpg");
});


// RESUME FILE CHECK

const resumeLinks = document.querySelectorAll(
    'a[href="assets/resume.pdf"]'
);

resumeLinks.forEach(link => {

    link.addEventListener("click", () => {
        console.log("Resume download requested.");
    });

});


// CONSOLE MESSAGE

console.log("Sajid Abbas Portfolio Loaded Successfully!");
console.log("Software Test Engineer | QA Automation");
// Button and Navigation Sound Effects

function playClickSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(700, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
        350,
        audioContext.currentTime + 0.08
    );

    gain.gain.setValueAtTime(0.12, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.09
    );

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Resume Zuuup Sound
function playResumeSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.type = "sawtooth";

    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
        150,
        audioContext.currentTime + 0.35
    );

    gain.gain.setValueAtTime(0.001, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, audioContext.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.4
    );

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.4);
}

// Apply sound to navigation links and buttons
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