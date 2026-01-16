var audio = document.getElementById("audioPlayer"), loader = document.getElementById("preloader");

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
window.addEventListener("scroll", () => { let e = ""; sections.forEach(t => { let o = t.offsetTop; t.clientHeight, pageYOffset >= o - 200 && (e = t.getAttribute("id")) }), mobilenavLi.forEach(t => { t.classList.remove("activeThismobiletab"), t.classList.contains(e) && t.classList.add("activeThismobiletab") }), navLi.forEach(t => { t.classList.remove("activeThistab"), t.classList.contains(e) && t.classList.add("activeThistab") }) });
console.log("%c Designed and Developed by NguyenManhHa ", "background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white;font-weight:900;font-size:1rem; padding:20px;");
let mybutton = document.getElementById("backtotopbutton");
function scrollFunction() { document.body.scrollTop > 400 || document.documentElement.scrollTop > 400 ? mybutton.style.display = "block" : mybutton.style.display = "none" }
function scrolltoTopfunction() { document.body.scrollTop = 0, document.documentElement.scrollTop = 0 }
window.onscroll = function () { scrollFunction() }, document.addEventListener("contextmenu", function (e) { "IMG" === e.target.nodeName && e.preventDefault() }, !1);
let Pupils = document.getElementsByClassName("footer-pupil"), pupilsArr = Array.from(Pupils), pupilStartPoint = -10, pupilRangeX = 20, pupilRangeY = 15, mouseXStartPoint = 0, mouseXEndPoint = window.innerWidth, currentXPosition = 0, fracXValue = 0, mouseYEndPoint = window.innerHeight, currentYPosition = 0, fracYValue = 0, mouseXRange = mouseXEndPoint - mouseXStartPoint;
const mouseMove = e => { fracXValue = (currentXPosition = e.clientX - mouseXStartPoint) / mouseXRange, fracYValue = (currentYPosition = e.clientY) / mouseYEndPoint; let t = pupilStartPoint + fracXValue * pupilRangeX, o = pupilStartPoint + fracYValue * pupilRangeY; pupilsArr.forEach(e => { e.style.transform = `translate(${t}px, ${o}px)` }) }, windowResize = e => { mouseXEndPoint = window.innerWidth, mouseYEndPoint = window.innerHeight, mouseXRange = mouseXEndPoint - mouseXStartPoint };
window.addEventListener("mousemove", mouseMove), window.addEventListener("resize", windowResize);