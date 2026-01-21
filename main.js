var audio = document.getElementById("audioPlayer"), loader = document.getElementById("preloader");

function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        const tooltip = element.querySelector('.copy-tooltip');
        const originalText = tooltip.innerText;
        tooltip.innerText = "Copied!";
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = "1";

        setTimeout(() => {
            tooltip.innerText = originalText;
            tooltip.style.visibility = "";
            tooltip.style.opacity = "";
        }, 1500);
    });
}

const originalTitle = "zenjichen | profile";
let titleInterval;

function startDancingTitle() {
    if (titleInterval) clearInterval(titleInterval);
    let index = originalTitle.length;
    let isDeleting = true;

    titleInterval = setInterval(() => {
        document.title = originalTitle.substring(0, index);

        if (isDeleting) {
            index--;
            if (index < 0) {
                isDeleting = false;
                index = 0;
            }
        } else {
            index++;
            if (index > originalTitle.length) {
                isDeleting = true;
                index = originalTitle.length;
            }
        }
    }, 200); // 200ms for a snappy 'dancing' feel like guns.lol
}

function stopDancingTitle() {
    if (titleInterval) clearInterval(titleInterval);
    document.title = originalTitle;
}

function fadeAudioIn() {
    if (window.audioStarted) return;

    audio.muted = false; // Ensure not muted
    audio.volume = 0;

    const startFade = () => {
        audio.play().then(() => {
            window.audioStarted = true;
            startDancingTitle(); // Start dancing title when music starts
            const soundSwitch = document.getElementById("switchforsound");
            if (soundSwitch) soundSwitch.checked = true;

            let fadeInterval = setInterval(() => {
                if (audio.volume < 0.9) {
                    audio.volume += 0.1;
                } else {
                    audio.volume = 1;
                    clearInterval(fadeInterval);
                }
            }, 400); // 400ms * 10 steps = 4 seconds total

            // Clean up listeners
            ["click", "keydown", "touchstart", "mousedown"].forEach(event => {
                window.removeEventListener(event, startFade);
            });
        }).catch(e => {
            console.log("Autoplay blocked, waiting for interaction.");
        });
    };

    // Try immediate (might work if user interacted before or browser allows)
    startFade();

    // Interaction fallback
    ["click", "keydown", "touchstart", "mousedown"].forEach(event => {
        window.addEventListener(event, startFade, { once: true });
    });
}

function settingtoggle() {
    document.getElementById("setting-container").classList.toggle("settingactivate");
    document.getElementById("visualmodetogglebuttoncontainer").classList.toggle("visualmodeshow");
    document.getElementById("soundtogglebuttoncontainer").classList.toggle("soundmodeshow");
}

function playpause() {
    const soundSwitch = document.getElementById("switchforsound");
    if (soundSwitch.checked) {
        audio.play().then(() => {
            audio.volume = 1;
            window.audioStarted = true;
            startDancingTitle();
        });
    } else {
        audio.pause();
        stopDancingTitle();
    }
}
function visualmode() { document.body.classList.toggle("light-mode"), document.querySelectorAll(".needtobeinvert").forEach(function (e) { e.classList.toggle("invertapplied") }) }

window.addEventListener("load", function () {
    loader.style.display = "none";
    document.querySelector(".hey").classList.add("popup");
    fadeAudioIn();
});

let emptyArea = document.getElementById("emptyarea"), mobileTogglemenu = document.getElementById("mobiletogglemenu");
function hamburgerMenu() { document.body.classList.toggle("stopscrolling"), document.getElementById("mobiletogglemenu").classList.toggle("show-toggle-menu"), document.getElementById("burger-bar1").classList.toggle("hamburger-animation1"), document.getElementById("burger-bar2").classList.toggle("hamburger-animation2"), document.getElementById("burger-bar3").classList.toggle("hamburger-animation3") }
function hidemenubyli() { document.body.classList.toggle("stopscrolling"), document.getElementById("mobiletogglemenu").classList.remove("show-toggle-menu"), document.getElementById("burger-bar1").classList.remove("hamburger-animation1"), document.getElementById("burger-bar2").classList.remove("hamburger-animation2"), document.getElementById("burger-bar3").classList.remove("hamburger-animation3") }
const sections = document.querySelectorAll("section"), navLi = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li"), mobilenavLi = document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");

let lastLeft = 0;
function moveFire() {
    const activeTab = document.querySelector(".navbar-tabs-ul li.activeThistab");
    const fire = document.getElementById("nav-fire");
    if (activeTab && fire) {
        const tabRect = activeTab.getBoundingClientRect();
        const navRect = document.querySelector(".navbar-tabs-ul").getBoundingClientRect();
        const targetLeft = tabRect.left - navRect.left + (tabRect.width / 2) - (fire.offsetWidth / 2);

        if (lastLeft !== 0 && Math.abs(targetLeft - lastLeft) > 10) {
            const isMovingRight = targetLeft > lastLeft;
            fire.classList.remove("nav-fire-tilt-right", "nav-fire-tilt-left");
            void fire.offsetWidth; // Trigger reflow
            fire.classList.add(isMovingRight ? "nav-fire-tilt-right" : "nav-fire-tilt-left");
            setTimeout(() => {
                fire.classList.remove("nav-fire-tilt-right", "nav-fire-tilt-left");
            }, 600);
        }

        fire.style.left = `${targetLeft}px`;
        fire.classList.add("active");
        lastLeft = targetLeft;
    } else if (fire) {
        fire.classList.remove("active");
    }
}

window.addEventListener("scroll", () => {
    let e = "";
    sections.forEach(t => {
        let o = t.offsetTop;
        pageYOffset >= o - 200 && (e = t.getAttribute("id"))
    });
    mobilenavLi.forEach(t => {
        t.classList.remove("activeThismobiletab");
        t.classList.contains(e) && t.classList.add("activeThismobiletab")
    });
    navLi.forEach(t => {
        t.classList.remove("activeThistab");
        t.classList.contains(e) && t.classList.add("activeThistab")
    });
    moveFire();

    // Background Parallax & Blur/Fade
    const scrollVal = window.scrollY;
    const windowH = window.innerHeight;
    const docH = document.documentElement.scrollHeight;
    const scrollPercent = Math.min(scrollVal / (docH - windowH), 1);

    const bgContainer = document.querySelector(".bg-container");
    const bgOpaque = document.querySelector(".bg-opaque");

    if (bgContainer && bgOpaque) {
        // Blur increases on scroll
        bgContainer.style.filter = `blur(${scrollPercent * 15}px) brightness(${0.8 - scrollPercent * 0.3})`;
        // Opacity of dark overlay increases
        bgOpaque.style.opacity = scrollPercent * 0.6;
        // Subtle Parallax Zoom
        bgContainer.style.backgroundSize = `${250 + scrollPercent * 50}%`;
    }
});

// Water Drop Cursor Logic
const cursorInner = document.getElementById("cursor-inner");
const cursorOuter = document.getElementById("cursor-outer");
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let lastMouseX = 0, lastMouseY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorInner.style.left = `${mouseX}px`;
    cursorInner.style.top = `${mouseY}px`;
});

function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;

    cursorX += dx * 0.15;
    cursorY += dy * 0.15;

    cursorOuter.style.left = `${cursorX}px`;
    cursorOuter.style.top = `${cursorY}px`;

    // Liquid Momentum / Stretching
    const vx = mouseX - lastMouseX;
    const vy = mouseY - lastMouseY;
    const speed = Math.sqrt(vx * vx + vy * vy);
    const angle = Math.atan2(vy, vx) * (180 / Math.PI);

    if (speed > 1) {
        const stretch = 1 + Math.min(speed / 100, 0.5);
        cursorOuter.style.transform = `translate(-50%, -50%) rotate(${angle + 90}deg) scaleX(${1 / stretch}) scaleY(${stretch})`;
        cursorOuter.style.borderRadius = "50% 50% 40% 40% / 70% 70% 30% 30%";
    } else {
        cursorOuter.style.transform = `translate(-50%, -50%) rotate(0deg) scale(1)`;
        cursorOuter.style.borderRadius = "50% 50% 50% 50% / 60% 60% 40% 40%";
    }

    lastMouseX = mouseX;
    lastMouseY = mouseY;

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover Effects
document.querySelectorAll("a, button, .letsTalkBtn, label").forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursorInner.classList.add("hover");
        cursorOuter.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
        cursorInner.classList.remove("hover");
        cursorOuter.classList.remove("hover");
    });
});

window.addEventListener("resize", moveFire);
window.addEventListener("load", moveFire);
console.log("%c Designed and Developed by NguyenManhHa ", "background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white;font-weight:900;font-size:1rem; padding:20px;");
let mybutton = document.getElementById("backtotopbutton");
function scrollFunction() { document.body.scrollTop > 400 || document.documentElement.scrollTop > 400 ? mybutton.style.display = "block" : mybutton.style.display = "none" }
function scrolltoTopfunction() { document.body.scrollTop = 0, document.documentElement.scrollTop = 0 }
window.onscroll = function () { scrollFunction() }, document.addEventListener("contextmenu", function (e) { "IMG" === e.target.nodeName && e.preventDefault() }, !1);
let Pupils = document.getElementsByClassName("footer-pupil"), pupilsArr = Array.from(Pupils), pupilStartPoint = -6, pupilRangeX = 12, pupilRangeY = 30, mouseXStartPoint = 0, mouseXEndPoint = window.innerWidth, currentXPosition = 0, fracXValue = 0, mouseYEndPoint = window.innerHeight, currentYPosition = 0, fracYValue = 0, mouseXRange = mouseXEndPoint - mouseXStartPoint;
const mouseMove = e => { fracXValue = (currentXPosition = e.clientX - mouseXStartPoint) / mouseXRange, fracYValue = (currentYPosition = e.clientY) / mouseYEndPoint; let t = pupilStartPoint + fracXValue * pupilRangeX, o = pupilStartPoint + fracYValue * pupilRangeY; pupilsArr.forEach(e => { e.style.transform = `translate(${t}px, ${o}px)` }) }, windowResize = e => { mouseXEndPoint = window.innerWidth, mouseYEndPoint = window.innerHeight, mouseXRange = mouseXEndPoint - mouseXStartPoint };
window.addEventListener("mousemove", mouseMove), window.addEventListener("resize", windowResize);