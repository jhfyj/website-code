import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// =========================
// ✅ ADDED: error surfacing
// =========================
window.addEventListener("error", (e) => {
    console.error("Runtime error:", e.message, e.error);
});
window.addEventListener("unhandledrejection", (e) => {
    console.error("Unhandled promise:", e.reason);
});

// =========================
// Animation state
// =========================
let introComplete = false;
let scrollProgress = 0;
const INTRO_SCROLL_LENGTH = 3;

// =========================
// Scene
// =========================
const scene = new THREE.Scene();

const CardLoader1 = new GLTFLoader();
const CardLoader2 = new GLTFLoader();
const CardLoader3 = new GLTFLoader();
const CardLoader4 = new GLTFLoader();
const CardLoader5 = new GLTFLoader();
const CardLoader6 = new GLTFLoader();
// const CardLoader7 = new GLTFLoader();
// const CardLoader8 = new GLTFLoader();
// const CardLoader9 = new GLTFLoader();

const CARD_LINKS = [
  "https://hfyj-art.com/branding/",             // cards[0]
  "https://hfyj-art.com/about/",                // cards[1]
  "https://hfyj-art.com/graphicdesign/",        // cards[2]
  "https://hfyj-art.com/immersiveexperience/",  // cards[3]
  "https://hfyj-art.com/motiongraphic/",        // cards[4]
  "https://hfyj-art.com/fineart/",              // cards[5]
//   "https://hfyj-art.com/installations/",        // cards[6]
//   "https://hfyj-art.com/uiux/",                 // cards[7]
//   "https://hfyj-art.com/afterdark/"             // cards[8]
];



const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// let Graphicbutton = null;
// let Aboutbutton = null;
// let Immersivebutton = null;
// let Brandingbutton = null;
// let MotionGraphicbutton = null;
// let FineArtbutton = null;
// let Installationbutton = null;
// let UiUxbutton = null;
// let Afterdarkbutton = null;

const cardgroup = new THREE.Group();
const cards = [];

let targetRotation = null;
const snapSpeed = 0.1;
const cardCount = 6;
let scrollTimeout = null;

let totalModels = 6;
let loadedModels = 0;

let AboutMemodelScene = null;

let swipeStartY = 0;
let swipeStartX = 0;
let lastSwipeY = 0;
let swipeMoved = false;


const aboutPanels = document.getElementById("about-panels");
const panelFront = document.getElementById("panel-front");
const panelBack = document.getElementById("panel-back");





// Store initial Y positions for all cards (not strictly needed but kept)
const cardInitialY = {};

// =====================================
// ✅ ADDED: About pivot for cursor-facing
// =====================================
const aboutLook = {
    pivot: new THREE.Group(),
    ready: false,
    baseQuat: new THREE.Quaternion(),
    aimYaw: 0,
    aimPitch: 0,
    yawSm: 0,
    pitchSm: 0,
};

// ✅ ADDED: gate user scrolling until typing completes
let hiTypingDone = false;
let scrollHasStarted = false; // for blur/fade behavior


// =========================
// Camera (fixed)
// =========================
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 0, 4); // fixed

// =========================
// Renderer
// =========================
const canvas = document.querySelector("canvas.threejs");
if (!canvas) {
    throw new Error('Canvas not found. Expected <canvas class="threejs"></canvas>.');
}

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// =========================
// Lights
// =========================
const directionalLight = new THREE.DirectionalLight(0xFFF5A7, 3);
directionalLight.position.set(0.5, 0.2, 0.6);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xA7D7FF, 3);
directionalLight2.position.set(-0.5, -0.3, 0.6);
scene.add(directionalLight2);

// =========================
// Controls (locked)
// =========================
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableRotate = false;
controls.enableZoom = false;
controls.enablePan = false;
controls.minPolarAngle = Math.PI / 2 - THREE.MathUtils.degToRad(10);
controls.maxPolarAngle = Math.PI / 2 + THREE.MathUtils.degToRad(10);

// =========================
// Drag rotate state
// =========================
let isDragging = false;
let previousMouseX = 0;

// =========================
// HTML overlay elements
// =========================
const logoWrap = document.getElementById("logo-wrap");

const descriptionPanel = document.getElementById("description-panel");
const socialLinks = document.getElementById("social-links");

let introStep = 0;                 // 0 waiting for trigger A, 1 anim A running, 2 waiting for trigger B, 3 anim B running, 4 done
let introAnimStart = 0;

let introScrollAccum = 0;
const INTRO_TRIGGER_SCROLL = 180;  // tune
const INTRO_A_DURATION = 1.05;     // seconds
const INTRO_B_DURATION = 1.10;     // seconds


let carouselSettled = true;
let lastGroupRotY = 0;
let stillFrames = 0;

// tune these
const ROT_EPS = 0.00035;      // how small rotation change counts as "still"
const STILL_FRAMES_NEEDED = 8; // how many frames in a row to be considered "stopped"





let scrollArrow = null;
let arrowTimer = null;

function ensureScrollArrow() {

    scrollArrow = document.getElementById("scroll-arrow");
    if (scrollArrow) return scrollArrow;
    console.log("scrollArrow found?", !!scrollArrow);

    // create it if missing
    scrollArrow = document.createElement("div");
    scrollArrow.id = "scroll-arrow";
    scrollArrow.setAttribute("aria-hidden", "true");
    scrollArrow.innerHTML = `<img src="/Icon/arrow.svg" alt="" />`; // <-- adjust path if needed
    document.body.appendChild(scrollArrow);

    return scrollArrow;
}

function showArrow(delayMs = 800) {
    const el = ensureScrollArrow();
    clearTimeout(arrowTimer);
    arrowTimer = setTimeout(() => {
        el.classList.add("is-visible");
    }, delayMs);
}

function hideArrow() {
    const el = document.getElementById("scroll-arrow");
    if (!el) return;
    clearTimeout(arrowTimer);
    el.classList.remove("is-visible");
}

// Directions overlay
// Directions overlay
const directions = document.getElementById("directions");
let directionsTimer = null;
let directionsShown = false;

function showDirections(delayMs = 1500) {
    if (!directions) return;
    clearTimeout(directionsTimer);

    directionsTimer = setTimeout(() => {
        directions.classList.add("is-visible");
        directions.classList.remove("is-hidden");
        directionsShown = true;
    }, delayMs);
}

function hideDirections() {
    if (!directions) return;
    clearTimeout(directionsTimer);

    directions.classList.remove("is-visible");
    directions.classList.add("is-hidden");
}






// ✅ ADDED: smoother "pro website" easing
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}


// =====================================
// ✅ ADDED: black overlay (create if missing)
// =====================================
function ensureBlackOverlay() {
    let overlay = document.getElementById("black-overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "black-overlay";
        document.body.appendChild(overlay);
    }
    // inline styles so you don't *have* to touch CSS
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.background = "black";
    overlay.style.zIndex = "9999";
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "none";
    overlay.style.transition = "opacity 1s ease";
    return overlay;
}

// =====================================
// ✅ ADDED: typing utilities
// =====================================



// =====================================
// ✅ ADDED: start black -> fade -> type Hi!
// =====================================
window.addEventListener("load", async () => {


    if (aboutPanels) aboutPanels.classList.remove("is-on");
    if (panelFront) panelFront.style.opacity = "0";
    if (panelBack) panelBack.style.opacity = "0";
    const overlay = ensureBlackOverlay();

    // small pause on black
    await new Promise((r) => setTimeout(r, 350));

    // fade black away
    overlay.style.opacity = "0";
    await new Promise((r) => setTimeout(r, 850));

    // show logo container + run reveal
    if (logoWrap) {
        logoWrap.style.display = "block";
        logoWrap.style.opacity = "1";
        logoWrap.classList.remove("reveal");
        // IMPORTANT: reset transform so it starts centered
        logoWrap.style.transform = "translate(-50%, -50%)";

    }

    await new Promise((r) => setTimeout(r, 180));
    if (logoWrap) logoWrap.classList.add("reveal");

    await new Promise((r) => setTimeout(r, 900));

    hiTypingDone = true;
    showArrow(1200);

    overlay.remove();
});



// =========================
// Models
// =========================
CardLoader1.load("https://jhfyj.github.io/website-code/models/clarus.glb", (gltf) => {
    const m = gltf.scene;
    cards[0] = m;
    m.userData.cardIndex = 0;

    m.scale.set(0.2, 0.2, 0.2);
    m.position.set(Math.sin(THREE.MathUtils.degToRad(1 * 360 / 6)) * 2, -8, Math.cos(THREE.MathUtils.degToRad(1 * 360 / 6)) * 2);
    m.rotation.y = THREE.MathUtils.degToRad(1 * 360 / 6);
    m.traverse((child) => child.isMesh && (child.material.envMapIntensity = 0));

    cardgroup.add(m);
    hideLoader();
});

CardLoader2.load("https://jhfyj.github.io/website-code/models/aboutme.glb", (gltf) => {
  const m = gltf.scene;                 // the about model root
  AboutMemodelScene = m;                // keep your existing variable if you use it elsewhere

  // (optional) if you were previously grabbing button, delete that now
  // Aboutbutton = m.getObjectByName("Button");

  // place/scale like before
  m.position.set(
    Math.sin(THREE.MathUtils.degToRad(0 * 360 / 6)) * 2,
    -8,
    Math.cos(THREE.MathUtils.degToRad(0 * 360 / 6)) * 2
  );
  m.rotation.y = THREE.MathUtils.degToRad(0 * 360 / 6);
  m.scale.set(0.2, 0.2, 0.2);
  m.traverse((child) => child.isMesh && (child.material.envMapIntensity = 0));

  // ✅ pivot wrap (use aboutLook.pivot, not m.pivot)
  const worldPos = m.position.clone();
  const worldQuat = m.quaternion.clone();

  aboutLook.pivot.clear();
  aboutLook.pivot.position.copy(worldPos);
  aboutLook.pivot.quaternion.copy(worldQuat);

  // reset model locally before parenting
  m.position.set(0, 0, 0);
  m.quaternion.identity();

  aboutLook.pivot.add(m);

  // keep your cursor-facing logic working
  aboutLook.baseQuat.copy(m.quaternion);
  aboutLook.ready = true;

  // ✅ IMPORTANT: clickable root should be the pivot
  cards[1] = aboutLook.pivot;
  aboutLook.pivot.userData.cardIndex = 1;

  cardgroup.add(aboutLook.pivot);
  hideLoader();
});


CardLoader3.load("https://jhfyj.github.io/website-code/models/puregym.glb", (gltf) => {
    const m = gltf.scene;
    cards[2] = m;
    m.userData.cardIndex = 0;

    m.scale.set(0.2, 0.2, 0.2);
    m.position.set(Math.sin(THREE.MathUtils.degToRad(2 * 360 / 6)) * 2, -8, Math.cos(THREE.MathUtils.degToRad(2 * 360 / 6)) * 2);
    m.rotation.y = THREE.MathUtils.degToRad(2 * 360 / 6);
    m.traverse((child) => child.isMesh && (child.material.envMapIntensity = 0));

    cardgroup.add(m);
    hideLoader();
});

CardLoader4.load("https://jhfyj.github.io/website-code/models/asba.glb", (gltf) => {
    const m = gltf.scene;
    cards[3] = m;
    m.userData.cardIndex = 0;

    m.scale.set(0.2, 0.2, 0.2);
    m.position.set(Math.sin(THREE.MathUtils.degToRad(3 * 360 / 6)) * 2, -8, Math.cos(THREE.MathUtils.degToRad(3 * 360 / 6)) * 2);
    m.rotation.y = THREE.MathUtils.degToRad(3 * 360 / 6);
    m.traverse((child) => child.isMesh && (child.material.envMapIntensity = 0));

    cardgroup.add(m);
    hideLoader();
});

CardLoader5.load("https://jhfyj.github.io/website-code/models/leslie.glb", (gltf) => {
    const m = gltf.scene;
    cards[4] = m;
    m.userData.cardIndex = 0;

    m.scale.set(0.2, 0.2, 0.2);
    m.position.set(Math.sin(THREE.MathUtils.degToRad(4 * 360 / 6)) * 2, -8, Math.cos(THREE.MathUtils.degToRad(4 * 360 / 6)) * 2);
    m.rotation.y = THREE.MathUtils.degToRad(4 * 360 / 6);
    m.traverse((child) => child.isMesh && (child.material.envMapIntensity = 0));

    cardgroup.add(m);
    hideLoader();
});

CardLoader6.load("https://jhfyj.github.io/website-code/models/techatnyu.glb", (gltf) => {
    const m = gltf.scene;
    cards[5] = m;
    m.userData.cardIndex = 0;

    m.scale.set(0.2, 0.2, 0.2);
    m.position.set(Math.sin(THREE.MathUtils.degToRad(5 * 360 / 6)) * 2, -8, Math.cos(THREE.MathUtils.degToRad(5 * 360 / 6)) * 2);
    m.rotation.y = THREE.MathUtils.degToRad(5 * 360 / 6);
    m.traverse((child) => child.isMesh && (child.material.envMapIntensity = 0));

    cardgroup.add(m);
    hideLoader();
});

// CardLoader7.load("https://jhfyj.github.io/website-code/models/installation.glb", (gltf) => {
//     const m = gltf.scene;
//     cards[6] = m;
//     m.userData.cardIndex = 0;

//     m.scale.set(0.3, 0.3, 0.3);
//     m.position.set(Math.sin(THREE.MathUtils.degToRad(6 * 360 / 9)) * 3, -8, Math.cos(THREE.MathUtils.degToRad(6 * 360 / 9)) * 3);
//     m.rotation.y = THREE.MathUtils.degToRad(6 * 360 / 9);
//     m.traverse((child) => child.isMesh && (child.material.envMapIntensity = 0));

//     cardgroup.add(m);
//     hideLoader();
// });

// CardLoader8.load("https://jhfyj.github.io/website-code/models/uiux.glb", (gltf) => {
//     const m = gltf.scene;
//     cards[7] = m;
//     m.userData.cardIndex = 0;

//     m.scale.set(0.3, 0.3, 0.3);
//     m.position.set(Math.sin(THREE.MathUtils.degToRad(7 * 360 / 9)) * 3, -8, Math.cos(THREE.MathUtils.degToRad(7 * 360 / 9)) * 3);
//     m.rotation.y = THREE.MathUtils.degToRad(7 * 360 / 9);
//     m.traverse((child) => child.isMesh && (child.material.envMapIntensity = 0));

//     cardgroup.add(m);
//     hideLoader();
// });

// CardLoader9.load("https://jhfyj.github.io/website-code/models/afterdark.glb", (gltf) => {
//     const m = gltf.scene;
//     cards[8] = m;
//     m.userData.cardIndex = 0;

//     m.scale.set(0.2, 0.2, 0.2);
//     m.position.set(Math.sin(THREE.MathUtils.degToRad(8 * 360 / 9)) * 3, -8, Math.cos(THREE.MathUtils.degToRad(8 * 360 / 9)) * 3);
//     m.rotation.y = THREE.MathUtils.degToRad(8 * 360 / 9);
//     m.traverse((child) => child.isMesh && (child.material.envMapIntensity = 0));

//     cardgroup.add(m);
//     hideLoader();
// });

scene.add(cardgroup);

// =========================
// Scroll handling
// =========================
let totalScroll = 0;

window.addEventListener("wheel", (e) => {
    if (!hiTypingDone) {
        e.preventDefault();
        return;
    }
    hideArrow();
    hideDirections();

    // ✅ Smooth intro uses scroll only as a TRIGGER
    if (introStep < 4) {
        e.preventDefault();

        // if an animation is currently playing, ignore scroll
        if (introStep === 1 || introStep === 3) return;

        // accumulate scroll until threshold
        introScrollAccum += e.deltaY;

        if (Math.abs(introScrollAccum) >= INTRO_TRIGGER_SCROLL) {
            introScrollAccum = 0;

            // trigger step A
            if (introStep === 0) {
                introStep = 1;
                introAnimStart = performance.now();
            }
            // trigger step B
            else if (introStep === 2) {
                introStep = 3;

                introAnimStart = performance.now();

            }
        }
        return;
    }

    // ✅ normal rotation scrolling AFTER intro is fully done
    const scrollDelta = e.deltaY;
    cardgroup.rotation.y += scrollDelta * 0.002;
    targetRotation = null;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => snaptoNearestCard(), 100);
}, { passive: false });

function handleScrollDelta(deltaY) {
    if (!hiTypingDone) return;

    hideArrow();
    hideDirections();

    // intro triggers (same logic as wheel)
    if (introStep < 4) {
        // if animation is playing, ignore
        if (introStep === 1 || introStep === 3) return;

        introScrollAccum += deltaY;

        if (Math.abs(introScrollAccum) >= INTRO_TRIGGER_SCROLL) {
            introScrollAccum = 0;

            if (introStep === 0) {
                introStep = 1;
                introAnimStart = performance.now();
            } else if (introStep === 2) {
                introStep = 3;
                introAnimStart = performance.now();
            }
        }
        return;
    }

    // after intro: rotate carousel (same as wheel)
    cardgroup.rotation.y += deltaY * 0.002;
    targetRotation = null;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => snaptoNearestCard(), 100);
}



function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}

function updateIntroAnimation() {
    const p = scrollProgress;

    // Stage 1: keep Hi visible (typing handled on load)
    if (p <= 0.5) {
        if (!logoWrap) return;

        // ✅ ADDED: Only start blur/fade after the user actually scrolls
        if (scrollHasStarted) {
            const t = Math.min(1, p / 0.5); // 0..1 over Stage 1

            // opacity goes 1.0 -> 0.4
            const opacity = 1 - (1 - 0.4) * t;
            logoWrap.style.opacity = String(opacity);

            // blur goes 0px -> 10px (adjust as you like)
            const blurPx = 10 * t;
            logoWrap.style.filter = `blur(${blurPx}px)`;
        } else {
            // before scrolling starts, crisp + full opacity
            logoWrap.style.opacity = "1";
            logoWrap.style.filter = "blur(0px)";
        }
    }

    // Stage 2
    else if (p <= 1.5) {
        const fadeProgress = p - 0.5;

        if (logoWrap) logoWrap.style.opacity = String(Math.max(0, 1 - fadeProgress));

        const panelProgress = Math.min(1, fadeProgress);
        if (descriptionPanel) {
            descriptionPanel.style.opacity = String(panelProgress);
            descriptionPanel.style.pointerEvents = panelProgress > 0.5 ? "auto" : "none";
        }
        if (socialLinks) {
            socialLinks.style.opacity = String(panelProgress);
            socialLinks.style.pointerEvents = panelProgress > 0.5 ? "auto" : "none";
        }

        // ✏️ CHANGED: move About pivot (not model)
        if (aboutLook.ready) {
            const cardProgress = Math.min(1, fadeProgress * 1.2);
            const startY = 10;
            const endY = 0;
            aboutLook.pivot.position.y = startY + (endY - startY) * easeOutCubic(cardProgress);
        }

        // other cards stay low
        cards.forEach((card) => {
            if (card && card !== cards[1]) card.position.y = -8;
        });
    }

    // Stage 3 (camera fixed)
    else if (p <= 3) {
        const moveProgress = (p - 1.5) / 1.5;

        // ✏️ CHANGED: move the wrapper only (keeps true center)
        if (logoWrap) logoWrap.style.transform = `translateY(-${moveProgress * 100}vh)`;


        // ✏️ CHANGED: keep camera fixed
        camera.position.set(0, 0, 4);

        // other cards rise up
        cards.forEach((card) => {
            if (card && card !== cards[1]) {
                const startY = -8;
                const endY = 0;
                card.position.y = startY + (endY - startY) * easeOutCubic(moveProgress);
            }
        });

        // ✏️ CHANGED: About stays at y=0 via pivot
        if (aboutLook.ready) aboutLook.pivot.position.y = 0;

        if (moveProgress >= 0.99) {
            introComplete = true;
            if (logoWrap) logoWrap.style.display = "none";
        }
    }
}

// =========================
// ✏️ CHANGED: cursor "face" logic (yaw/pitch) instead of roll tilt
// =========================
window.addEventListener("mousemove", (e) => {
    if (introComplete) return;
    if (!aboutLook.ready) return;

    // ✅ CHANGED: enable while card is dropping (step 1)
    // (optionally also keep in step 2)
    if (!(introStep === 1 || introStep === 2)) return;

    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;

    const MAX_YAW = THREE.MathUtils.degToRad(18);
    const MAX_PITCH = THREE.MathUtils.degToRad(10);

    aboutLook.aimYaw = x * MAX_YAW;
    aboutLook.aimPitch = y * MAX_PITCH;
});


// =========================
// Resize
// =========================
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // transparent

});

// =========================
// Click / Touch (raycast)
// =========================
canvas.addEventListener("click", (event) => {
  if (!introComplete) return;
  if (!carouselSettled) return; // ✅ block while moving

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  checkCardIntersections();
});


canvas.addEventListener(
  "touchstart",
  (event) => {
    if (!introComplete) return;
    if (!carouselSettled) return; // ✅ block while moving
    if (swipeMoved) return;

    event.preventDefault();
    getNormalizedPointer(event);
    checkCardIntersections();
  },
  { passive: false }
);


canvas.addEventListener(
    "touchstart",
    (e) => {
        if (!hiTypingDone) return; // keep your intro lock consistent

        if (e.touches.length !== 1) return;
        swipeStartX = e.touches[0].clientX;
        swipeStartY = e.touches[0].clientY;
        lastSwipeY = swipeStartY;
        swipeMoved = false;
    },
    { passive: true }
);

// hide on ANY wheel scroll
window.addEventListener("wheel", () => {
    hideDirections();
}, { passive: true });

// hide as soon as user touches (even before a move threshold)
canvas.addEventListener("touchstart", () => {
    hideDirections();
}, { passive: true });

// hide on mouse drag start too (desktop)
canvas.addEventListener("pointerdown", () => {
    hideDirections();
}, { passive: true });

canvas.addEventListener(
    "touchmove",
    (e) => {
        if (!hiTypingDone) {
            e.preventDefault();
            return;
        }
        if (e.touches.length !== 1) return;

        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;

        const dx = x - swipeStartX;
        const dyFromStart = y - swipeStartY;

        // ✅ if user is actually swiping (not tapping), mark moved
        if (!swipeMoved && Math.abs(dyFromStart) > 8) swipeMoved = true;

        // ignore mostly-horizontal gestures
        if (Math.abs(dx) > Math.abs(dyFromStart) * 1.2) return;

        if (swipeMoved) {
            e.preventDefault(); // stop page scroll
            hideArrow();
            hideDirections();

            const dy = lastSwipeY - y; // swipe up => positive “scroll down”
            lastSwipeY = y;

            const TOUCH_MULT = 1.3; // tune
            handleScrollDelta(dy * TOUCH_MULT);

        }
    },
    { passive: false }
);

canvas.addEventListener(
    "touchend",
    () => {
        swipeMoved = false;
    },
    { passive: true }
);





function findCardRoot(obj) {
  let cur = obj;
  while (cur) {
    if (cur.userData && Number.isInteger(cur.userData.cardIndex)) return cur;
    cur = cur.parent;
  }
  return null;
}

function checkCardIntersections() {
  // Raycast against everything in the cardgroup
  const hits = raycaster.intersectObjects(cardgroup.children, true);
  if (!hits.length) return;

  const root = findCardRoot(hits[0].object);
  if (!root) return;

  const idx = root.userData.cardIndex;
  const url = CARD_LINKS[idx];
  if (!url) return;

  sendSignal();
  window.open(url, "_top");
}


// ✅ ADDED: runs a smooth intro animation independent of scroll jitter
function updateIntroTimeline(nowMs) {
    // -------------- Step A: About drops + panels fade + Hi blur/fade --------------
    if (introStep === 1) {
        // panels fade in + move upward while About drops



        const t = (nowMs - introAnimStart) / (INTRO_A_DURATION * 1000);
        const p = Math.min(1, Math.max(0, t));
        const e = easeInOutCubic(p);

        if (aboutPanels) aboutPanels.classList.add("is-on");

        // front/back panels move up + fade in while About drops
        if (panelFront) {
            panelFront.style.opacity = String(e);
            panelFront.style.transform = `translateY(${(1 - e) * 20}px)`;
        }

        if (panelBack) {
            panelBack.style.opacity = String(e);
            panelBack.style.transform = `translateY(${(1 - e) * 20}px)`;
        }

        // Hi blur/fade to 40%
        if (logoWrap) {
            logoWrap.style.display = "block";
            logoWrap.style.opacity = String(1 - (0.7) * e);
            logoWrap.style.filter = `blur(${12 * e}px)`;
        }

        // Panels ease in (optionally slide)
        if (descriptionPanel) {
            descriptionPanel.style.opacity = String(e);
            descriptionPanel.style.pointerEvents = e > 0.8 ? "auto" : "none";
            descriptionPanel.style.transform = `translateY(${(1 - e) * 12}px)`;
        }
        if (socialLinks) {
            socialLinks.style.opacity = String(e);
            socialLinks.style.pointerEvents = e > 0.8 ? "auto" : "none";
            socialLinks.style.transform = `translateY(${(1 - e) * 12}px)`;
        }

        // About card comes down
        if (aboutLook?.ready) {
            const startY = 10;
            const endY = 0;
            aboutLook.pivot.position.y = startY + (endY - startY) * e;
        } else if (AboutMemodelScene) {
            const startY = 10;
            const endY = 0;
            AboutMemodelScene.position.y = startY + (endY - startY) * e;
        }

        // ✅ IMPORTANT: keep other cards low ONLY during step A (not forever)
        cards.forEach((card) => {
            if (card && card !== cards[1]) card.position.y = -8;
        });

        if (p >= 1) {
            // ✅ ADDED: return to neutral once it lands
            aboutLook.aimYaw = 0;
            aboutLook.aimPitch = 0;

            introStep = 2; // waiting for trigger B
            showArrow(1500);

        }

    }

    // -------------- Step B: rest of cards rise up smoothly --------------
    else if (introStep === 3) {
        const t = (nowMs - introAnimStart) / (INTRO_B_DURATION * 1000);
        const p = Math.min(1, Math.max(0, t));
        const e = easeInOutCubic(p);
        if (panelFront) {
            panelFront.style.transform = `translateY(calc(-50% - ${e * 600}%))`; // moves UP as e increases
        }

        if (panelBack) {
            panelBack.style.transform = `translateY(calc(-50% - ${e * 600}%))`;
        }


        // Move Hi up and fade out (optional)
        if (logoWrap) {
            // logoWrap.style.transform = `translateX(-200vh)`;
            logoWrap.style.transform = `translate(-50%, calc(-50% - ${e * 300}%))`;

        }
        if (logoWrap) {
            logoWrap.style.opacity = String(0.3 * (1 - e));
            logoWrap.style.filter = `blur(${12}px)`; // keep blurred while exiting
        }


        // Bring other cards up from below
        cards.forEach((card) => {
            if (card && card !== cards[1]) {
                const startY = -8;
                const endY = 0;
                card.position.y = startY + (endY - startY) * e;
            }
        });

        // About stays pinned
        if (aboutLook?.ready) aboutLook.pivot.position.y = 0;
        if (AboutMemodelScene && !aboutLook?.ready) AboutMemodelScene.position.y = 0;

        if (p >= 1) {
            introStep = 4;        // ✅ intro fully done
            introComplete = true; // keep your existing gating if you use it elsewhere
            showDirections(1500);

            // cleanup Hi
            if (logoWrap) {
                // fade out
                logoWrap.style.opacity = String(0.4 * (1 - e));
                logoWrap.style.filter = `blur(${10}px)`;

                // optional: move up like before (feel free to tune)
                logoWrap.style.transform = "translate(-50%, -50%)";
            }

            if (logoWrap) logoWrap.style.display = "none";

        }
    }
}




function getNormalizedPointer(event) {
    const rect = canvas.getBoundingClientRect();
    let x, y;
    if (event.touches) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }
    mouse.x = ((x - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((y - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
}

// =========================
// Drag rotation
// =========================
canvas.addEventListener("pointerdown", (e) => {
    if (!introComplete) return;
    isDragging = true;
    previousMouseX = e.clientX;
});

window.addEventListener("pointerup", () => {
    if (!introComplete) return;
    isDragging = false;
    snaptoNearestCard();
});

canvas.addEventListener("pointermove", (e) => {
    if (!isDragging || !introComplete) return;
    const dx = e.clientX - previousMouseX;
    previousMouseX = e.clientX;
    cardgroup.rotation.y += dx * 0.003;
});

// =========================
// Render loop
// =========================
const clock = new THREE.Clock();
let previousTime = 0;

function damp(current, target, lambda, dt) {
    return THREE.MathUtils.damp(current, target, lambda, dt);
}

const renderloop = () => {
    const t = clock.getElapsedTime();
    const delta = t - previousTime;
    previousTime = t;

    controls.update();
    updateIntroTimeline(performance.now());


    // ✅ ADDED: apply About "face cursor" smoothly (on model, pivot holds placement)
    // ✅ About card faces cursor while dropping / waiting
    if (
        !introComplete &&
        aboutLook.ready &&
        (introStep === 1 || introStep === 2) &&
        AboutMemodelScene
    ) {
        aboutLook.yawSm = damp(aboutLook.yawSm, aboutLook.aimYaw, 10, delta);
        aboutLook.pitchSm = damp(aboutLook.pitchSm, aboutLook.aimPitch, 10, delta);

        const qYaw = new THREE.Quaternion().setFromAxisAngle(
            new THREE.Vector3(0, 1, 0),
            aboutLook.yawSm
        );
        const qPitch = new THREE.Quaternion().setFromAxisAngle(
            new THREE.Vector3(1, 0, 0),
            -aboutLook.pitchSm
        );

        AboutMemodelScene.quaternion
            .copy(aboutLook.baseQuat)
            .multiply(qYaw)
            .multiply(qPitch);
    } else if (AboutMemodelScene && aboutLook.ready) {
        // ✅ Smoothly return to neutral
        AboutMemodelScene.quaternion.slerp(aboutLook.baseQuat, 0.10);
    }


    renderer.render(scene, camera);
    window.requestAnimationFrame(renderloop);

    if (!isDragging && targetRotation !== null && introComplete) {
        const diff = targetRotation - cardgroup.rotation.y;
        if (Math.abs(diff) < 0.001) {
            cardgroup.rotation.y = targetRotation;
            targetRotation = null;
        } else {
            cardgroup.rotation.y += diff * snapSpeed;
        }
    }
    // --- detect whether carousel is moving ---
const dy = Math.abs(cardgroup.rotation.y - lastGroupRotY);
lastGroupRotY = cardgroup.rotation.y;

if (dy < ROT_EPS) {
  stillFrames++;
} else {
  stillFrames = 0;
}

// settled only if: not dragging, not snapping, and rotation has been still for a bit
carouselSettled = !isDragging && targetRotation === null && stillFrames >= STILL_FRAMES_NEEDED;

};

renderloop();

// =========================
// Helpers
// =========================
function sendSignal() {
    console.log("Signal: Button pressed");
}

function snaptoNearestCard() {
    const anglePerCard = (Math.PI * 2) / cardCount;
    const rawRotation = cardgroup.rotation.y;
    const nearestIndex = Math.round(rawRotation / anglePerCard);
    targetRotation = nearestIndex * anglePerCard;
}

function hideLoader() {
    loadedModels++;
    if (loadedModels === totalModels) {
        const loaderEl = document.getElementById("loader");
        if (loaderEl) loaderEl.style.display = "none";
        console.log("All models loaded.");
    }
}
