// import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// // initialize the scene
// const scene = new THREE.Scene();
// const brandingLoader = new GLTFLoader();
// const aboutMeLoader = new GLTFLoader();
// const graphicDesignLoader = new GLTFLoader();
// const immersiveexperieinceLoader = new GLTFLoader();
// const motiongraphicLoader = new GLTFLoader();
// const fineartLoader = new GLTFLoader();
// const installationLoader = new GLTFLoader();
// const uiuxLoader = new GLTFLoader();
// const afterdarkLoader = new GLTFLoader();

// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();



// let Graphicbutton = null;
// let Aboutbutton = null;
// let Immersivebutton = null;
// let Brandingbutton = null;
// let MotionGraphicbutton = null;
// let FineArtbutton = null;
// let Installationbutton = null;
// let UiUxbutton = null;
// let Afterdarkbutton = null;
// const cardgroup = new THREE.Group();
// const cards = [];

// let targetRotation= null;
// const snapSpeed=0.1;
// const cardCount = 9;

// let scrollTimeout = null;

// let totalModels = 9;
// let loadedModels = 0;

// console.log(document.getElementById("loader"));

// brandingLoader.load("https://jhfyj.github.io/website-code/models/branding.glb", (gltf) => {
//   const BrandingmodelScene = gltf.scene;
//   cards[0] = BrandingmodelScene;

//   // BrandingmodelScene.position.set(0, 0, 0);
//   BrandingmodelScene.scale.set(0.2, 0.2, 0.2);
//   BrandingmodelScene.position.set(Math.sin(THREE.MathUtils.degToRad(1* 360/9)) * 3, 0, Math.cos(THREE.MathUtils.degToRad(1* 360/9)) * 3);
//   BrandingmodelScene.rotation.y = THREE.MathUtils.degToRad(1* 360/9);

//  Brandingbutton = BrandingmodelScene.getObjectByName("Button");
//   console.log("About Button object:", Brandingbutton);

//   BrandingmodelScene.traverse((child) => {
//     if (child.isMesh) {
//       child.material.envMapIntensity = 0;
//     }
//   });
//   // scene.add(BrandingmodelScene);
//   cardgroup.add(BrandingmodelScene);
//   console.log("Model Branding children:", BrandingmodelScene.children);
//   hideLoader();
// });



// aboutMeLoader.load("https://jhfyj.github.io/website-code/models/aboutme.glb", (gltf) => {
//   const AboutMemodelScene = gltf.scene;
//   cards[1] = AboutMemodelScene;

//   // console.log(AboutMemodelScene);
//  Aboutbutton = AboutMemodelScene.getObjectByName("Button");
//   console.log("About Button object:", Aboutbutton);
//   AboutMemodelScene.position.set(Math.sin(THREE.MathUtils.degToRad(8* 360/9)) * 3, 0, Math.cos(THREE.MathUtils.degToRad(8* 360/9)) * 3);
//   AboutMemodelScene.rotation.y = THREE.MathUtils.degToRad(8* 360/9);
//   AboutMemodelScene.scale.set(0.2, 0.2, 0.2);
//   AboutMemodelScene.traverse((child) => {
//     if (child.isMesh) {
//       child.material.envMapIntensity = 0;
//     }
//   });
//   // scene.add(AboutMemodelScene);
//   cardgroup.add(AboutMemodelScene);
//   console.log("Model About children:", AboutMemodelScene.children);
//   hideLoader();
// });

// graphicDesignLoader.load("https://jhfyj.github.io/website-code/models/graphicdesign.glb", (gltf) => {
  
//   const GraphicDesignmodelScene = gltf.scene;

//   // console.log(GraphicDesignmodelScene);
//   Graphicbutton = GraphicDesignmodelScene.getObjectByName("button");
//   console.log("Loaded Graphic button:", Graphicbutton);
//   GraphicDesignmodelScene.position.set(Math.sin(THREE.MathUtils.degToRad(2* 360/9)) * 3, 0, Math.cos(THREE.MathUtils.degToRad(2* 360/9)) * 3);
//   GraphicDesignmodelScene.rotation.y = THREE.MathUtils.degToRad(2* 360/9);
//   GraphicDesignmodelScene.scale.set(0.2, 0.2, 0.2);
//   GraphicDesignmodelScene.traverse((child) => {
//     if (child.isMesh) {
//       child.material.envMapIntensity = 0;
//     }
    
//   });
//   // scene.add(GraphicDesignmodelScene);
//   console.log("Graphic Design:", GraphicDesignmodelScene.children);
//   cardgroup.add(GraphicDesignmodelScene);
//   hideLoader();
// });

// immersiveexperieinceLoader.load("https://jhfyj.github.io/website-code/models/immersive.glb", (gltf) => {
//   console.log("MODEL LOADED:", gltf);
  
//   const ImmersiveExperiencemodelScene = gltf.scene;
//   cards[3] = ImmersiveExperiencemodelScene;


//   // console.log("Button object:", button);
//   // ImmersiveExperiencemodelScene.position.set(6, 0, 0);
//   ImmersiveExperiencemodelScene.position.set(Math.sin(THREE.MathUtils.degToRad(3* 360/9)) * 3, 0, Math.cos(THREE.MathUtils.degToRad(3* 360/9)) * 3);
//   ImmersiveExperiencemodelScene.rotation.y = THREE.MathUtils.degToRad(3* 360/9);
//   ImmersiveExperiencemodelScene.scale.set(0.2, 0.2, 0.2);
//   Immersivebutton = ImmersiveExperiencemodelScene.getObjectByName("button");
//   console.log("Immersive button:", Immersivebutton);
//   ImmersiveExperiencemodelScene.traverse((child) => {
//     if (child.isMesh) {
//       child.material.envMapIntensity = 0;
//     }
//   });
//   // scene.add(ImmersiveExperiencemodelScene);
//       cardgroup.add(ImmersiveExperiencemodelScene);
//   hideLoader();
//   // console.log("Model children:", ImmersiveExperiencemodelScene.children);
// });

// motiongraphicLoader.load("https://jhfyj.github.io/website-code/models/motiongraphic.glb", (gltf) => {
//   const MotionGraphicModelScene = gltf.scene;
//   cards[0] = MotionGraphicModelScene;

//   // MotionGraphicModelScene.position.set(0, 0, 0);
//   MotionGraphicModelScene.scale.set(0.2, 0.2, 0.2);
//   MotionGraphicModelScene.position.set(Math.sin(THREE.MathUtils.degToRad(4* 360/9)) * 3, 0, Math.cos(THREE.MathUtils.degToRad(4* 360/9)) * 3);
//   MotionGraphicModelScene.rotation.y = THREE.MathUtils.degToRad(4* 360/9);

//  MotionGraphicbutton = MotionGraphicModelScene.getObjectByName("button");
//   console.log("Motion Graphic button object:", MotionGraphicbutton);
//   MotionGraphicModelScene.traverse((child) => {
//     if (child.isMesh) {
//       child.material.envMapIntensity = 0;
//     }
//   });
//   // scene.add(MotionGraphicModelScene);
//   cardgroup.add(MotionGraphicModelScene);
//   hideLoader();
//   // console.log("Model Branding children:", MotionGraphicModelScene.children);
// });

// fineartLoader.load("https://jhfyj.github.io/website-code/models/fineart.glb", (gltf) => {
//   const FineArtModelScene = gltf.scene;
//   cards[5] = FineArtModelScene;

//   // MotionGraphicModelScene.position.set(0, 0, 0);
//   FineArtModelScene.scale.set(0.2, 0.2, 0.2);
//   FineArtModelScene.position.set(Math.sin(THREE.MathUtils.degToRad(5* 360/9)) * 3, 0, Math.cos(THREE.MathUtils.degToRad(5* 360/9)) * 3);
//   FineArtModelScene.rotation.y = THREE.MathUtils.degToRad(5* 360/9);

//  FineArtbutton = FineArtModelScene.getObjectByName("button");
//   console.log("Fineart object:", FineArtbutton);
//   FineArtModelScene.traverse((child) => {
//     if (child.isMesh) {
//       child.material.envMapIntensity = 0;
//     }
//   });
//   // scene.add(FineArtModelScene);
//   cardgroup.add(FineArtModelScene);
//   hideLoader();
//   // console.log("Model Branding children:", FineArtModelScene.children);
// });

// installationLoader.load("https://jhfyj.github.io/website-code/models/installation.glb", (gltf) => {
//   const InstallationModelScene = gltf.scene;
//   cards[6] = InstallationModelScene;

//   InstallationModelScene.scale.set(0.3, 0.3, 0.3);
//   InstallationModelScene.position.set(Math.sin(THREE.MathUtils.degToRad(6* 360/9)) * 3, 0, Math.cos(THREE.MathUtils.degToRad(6* 360/9)) * 3);
//   InstallationModelScene.rotation.y = THREE.MathUtils.degToRad(6* 360/9);

//   Installationbutton = InstallationModelScene.getObjectByName("button");
//   console.log("Installation object:", Installationbutton);
//   InstallationModelScene.traverse((child) => {
//     if (child.isMesh) {
//       child.material.envMapIntensity = 0;
//     }
//   });
//   // scene.add(InstallationModelScene);
//   cardgroup.add(InstallationModelScene);
//   hideLoader();
// });

// uiuxLoader.load("https://jhfyj.github.io/website-code/models/uiux.glb", (gltf) => {
//   const UiUxModelScene = gltf.scene;
//   cards[7] = UiUxModelScene;

//   UiUxModelScene.scale.set(0.3, 0.3, 0.3);
//   UiUxModelScene.position.set(Math.sin(THREE.MathUtils.degToRad(0* 360/9)) * 3, 0, Math.cos(THREE.MathUtils.degToRad(0* 360/9)) * 3);
//   UiUxModelScene.rotation.y = THREE.MathUtils.degToRad(0* 360/9);
//   UiUxbutton = UiUxModelScene.getObjectByName("button");
//   console.log("Installation object:", UiUxbutton);
//   UiUxModelScene.traverse((child) => {
//     if (child.isMesh) {
//       child.material.envMapIntensity = 0;
//     }
//   });
//   // scene.add(UiUxModelScene);
//   cardgroup.add(UiUxModelScene);
//   hideLoader();
// });

// afterdarkLoader.load("https://jhfyj.github.io/website-code/models/afterdark.glb", (gltf) => {
//   const AfterdarkModelScene = gltf.scene;
//   cards[8] = AfterdarkModelScene; 
//   AfterdarkModelScene.scale.set(0.2, 0.2, 0.2);
//   AfterdarkModelScene.position.set(Math.sin(THREE.MathUtils.degToRad(7* 360/9)) * 3, 0, Math.cos(THREE.MathUtils.degToRad(7* 360/9)) * 3);
//   AfterdarkModelScene.rotation.y = THREE.MathUtils.degToRad(7* 360/9);
//   Afterdarkbutton = AfterdarkModelScene.getObjectByName("button");
//   console.log("Afterdark object:", Afterdarkbutton);
//   AfterdarkModelScene.traverse((child) => {
//     if (child.isMesh) {
//       child.material.envMapIntensity = 0;
//     }
//   });
//   // scene.add(AfterdarkModelScene);
//   cardgroup.add(AfterdarkModelScene);
//   hideLoader();
// });


// scene.add(cardgroup);


// // initialize the camera
// const camera = new THREE.PerspectiveCamera(
//   80,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   200
// );
// camera.position.z = 5;

// // initialize the renderer
// const canvas = document.querySelector("canvas.threejs");
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
//   antialias: true,
//   alpha: true,
// });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// // scene.add(ambientLight);
// const directionalLight = new THREE.DirectionalLight(0xFFF5A7, 3);
// directionalLight.position.set(0.5,0.2,0.6);
// scene.add(directionalLight);

// const directionalLight2 = new THREE.DirectionalLight(0xA7D7FF, 3);
// directionalLight2.position.set(-0.5,-0.3, 0.6);
// scene.add(directionalLight2);

// // const skyColor = 0xB1E1FF;  // light blue
// // const groundColor = 0xB97A20;  // brownish orange

// // const skylight = new THREE.HemisphereLight
// // (skyColor, 
// //   groundColor, 
// //   4
// // );

// // skylight.position.set(0, 20, 0);
// // scene.add(skylight);

// // instantiate the controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;
// controls.enableRotate = false;
// controls.enableZoom = false;
// controls.enablePan = false;
// controls.minPolarAngle = Math.PI / 2 - THREE.MathUtils.degToRad(10);  // 90 degrees
// controls.maxPolarAngle = Math.PI / 2 + THREE.MathUtils.degToRad(10);  // 90 degrees

// let isDragging = false;
// let previousMouseX = 0;


// window.addEventListener("resize", () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });


// canvas.addEventListener("click", (event) => {
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     raycaster.setFromCamera(mouse, camera);

//     checkButtonIntersections();
// });

// canvas.addEventListener("touchstart", (event) => {
//     event.preventDefault();   // VERY IMPORTANT for mobile tapping
//     getNormalizedPointer(event);
//     checkButtonIntersections();
// }, { passive: false });

// function checkButtonIntersections() {
//   if (Aboutbutton) {
//     const Aboutintersects = raycaster.intersectObject(Aboutbutton, true);
//     if (Aboutintersects.length > 0) {
//       sendSignal();
//       window.open("https://hfyj-art.com/about/", "_top");
//     }
//   }
//    if (Graphicbutton){
//     const Graphicintersects = raycaster.intersectObject(Graphicbutton, true);
//     if (Graphicintersects.length > 0) {
//       sendSignal();
//       window.open("https://hfyj-art.com/graphicdesign/", "_top");
//     }
//   }
//      if (Brandingbutton){
//     const Brandingintersects = raycaster.intersectObject(Brandingbutton, true);
//     if (Brandingintersects.length > 0) {
//       sendSignal();
//       window.open("https://hfyj-art.com/branding/", "_top");
//     }
//   }
//   if (MotionGraphicbutton){
//     const MotionGraphicintersects = raycaster.intersectObject(MotionGraphicbutton, true);
//     if (MotionGraphicintersects.length > 0) {
//       sendSignal();
//       window.open("https://hfyj-art.com/motiongraphic/", "_top");
//     }
//   }
//     if (Immersivebutton){
//     const Immersiveintersects = raycaster.intersectObject(Immersivebutton, true);
//     if (Immersiveintersects.length > 0) {
//       sendSignal();
//       window.open("https://hfyj-art.com/immersiveexperience/", "_top");
//     }
//   }
//       if (FineArtbutton){
//     const FineArtintersects = raycaster.intersectObject(FineArtbutton, true);
//     if (FineArtintersects.length > 0) {
//       sendSignal();
//       window.open("https://hfyj-art.com/fineart/", "_top");
//     }
//   }
//     if (Installationbutton){
//     const Installationintersects = raycaster.intersectObject(Installationbutton, true);
//     if (Installationintersects.length > 0) {
//       sendSignal();
//       window.open("https://hfyj-art.com/installations/", "_top");
//     }
//   }

//       if (UiUxbutton){
//     const UiUxintersects = raycaster.intersectObject(UiUxbutton, true);
//     if (UiUxintersects.length > 0) {
//       sendSignal();
//       window.open("https://hfyj-art.com/uiux/", "_top");
//     }
//   }
//       if (Afterdarkbutton){
//     const Afterdarkintersects = raycaster.intersectObject(Afterdarkbutton, true);
//     if (Afterdarkintersects.length > 0) {
//       sendSignal();
//       window.open("https://hfyj-art.com/afterdark/", "_top");
//     }
//   }
// }
// function getNormalizedPointer(event) {
//     const rect = canvas.getBoundingClientRect();
//     let x, y;

//     if (event.touches) {
//         x = event.touches[0].clientX;
//         y = event.touches[0].clientY;
//     } else {
//         x = event.clientX;
//         y = event.clientY;
//     }

//     mouse.x = ((x - rect.left) / rect.width) * 2 - 1;
//     mouse.y = -((y - rect.top) / rect.height) * 2 + 1;

//     raycaster.setFromCamera(mouse, camera);
// }


// // pointer down on the canvas
// canvas.addEventListener("pointerdown", (e) => {
//   isDragging = true;
//   previousMouseX = e.clientX;
// });

// window.addEventListener("load", () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });

// // pointer up anywhere
// window.addEventListener("pointerup", () => {
//   isDragging = false;
// snaptoNearestCard() 


// });

// window.addEventListener("wheel", (e) => {
//     const scrollDelta = e.deltaY;
//     cardgroup.rotation.y += scrollDelta * 0.002;
//     targetRotation = null;

//     clearTimeout(scrollTimeout);
//     scrollTimeout = setTimeout(() => {
//         snaptoNearestCard();
//     }, 100); // snap 100 ms after scroll stops
// });


// // pointer move on the canvas
// canvas.addEventListener("pointermove", (e) => {
//   if (!isDragging) return;
//   const deltaX = e.clientX - previousMouseX;
//   previousMouseX = e.clientX;
//   cardgroup.rotation.y += deltaX * 0.003;
// });

// // initialize the clock
// const clock = new THREE.Clock()
// let previousTime = 0

// // render the scene
// const renderloop = () => {
//   const currentTime = clock.getElapsedTime();
//   const delta = currentTime - previousTime;
//   previousTime = currentTime;

//   controls.update();

//   renderer.render(scene, camera);

//   window.requestAnimationFrame(renderloop);

//   if (!isDragging && targetRotation !== null) {
//     const diff = targetRotation - cardgroup.rotation.y;

//     if (Math.abs(diff) < 0.001) {
//         cardgroup.rotation.y = targetRotation;
//         targetRotation = null; // stop snapping
//     } else {

//         cardgroup.rotation.y += diff * snapSpeed;
//     }
// }
  
// };

// renderloop();


// function sendSignal() {
//   console.log("Signal: Button pressed");
// }

// // function handleResize() {
// //     const width = window.innerWidth;
// //     const height = window.innerHeight;

// //     // Update camera
// //     camera.aspect = width / height;
// //     camera.updateProjectionMatrix();

// //     // Update renderer
// //     renderer.setSize(width, height);
// //     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// // }

// function snaptoNearestCard() {
//     const anglePerCard = (Math.PI * 2) / cardCount;

//     // DO NOT normalize rotation
//     const rawRotation = cardgroup.rotation.y;

//     const nearestIndex = Math.round(rawRotation / anglePerCard);
//     targetRotation = nearestIndex * anglePerCard;
// }
// function hideLoader() {
//     loadedModels++;
//     if (loadedModels === totalModels) {
//         document.getElementById("loader").style.display = "none";
//         console.log("All models loaded.");
//     }
// }


// //hey
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Animation state
let introComplete = false;
let scrollProgress = 0;
const INTRO_SCROLL_LENGTH = 3; // Number of "scroll pages" for intro

// Initialize the scene
const scene = new THREE.Scene();
const brandingLoader = new GLTFLoader();
const aboutMeLoader = new GLTFLoader();
const graphicDesignLoader = new GLTFLoader();
const immersiveexperieinceLoader = new GLTFLoader();
const motiongraphicLoader = new GLTFLoader();
const fineartLoader = new GLTFLoader();
const installationLoader = new GLTFLoader();
const uiuxLoader = new GLTFLoader();
const afterdarkLoader = new GLTFLoader();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let Graphicbutton = null;
let Aboutbutton = null;
let Immersivebutton = null;
let Brandingbutton = null;
let MotionGraphicbutton = null;
let FineArtbutton = null;
let Installationbutton = null;
let UiUxbutton = null;
let Afterdarkbutton = null;
const cardgroup = new THREE.Group();
const cards = [];

let targetRotation = null;
const snapSpeed = 0.1;
const cardCount = 9;

let scrollTimeout = null;

let totalModels = 9;
let loadedModels = 0;

let AboutMemodelScene = null;

// Store initial Y positions for all cards
const cardInitialY = {};


const aboutLook = {
  pivot: new THREE.Group(),
  ready: false,
};


// Load models
brandingLoader.load("https://jhfyj.github.io/website-code/models/branding.glb", (gltf) => {
  const BrandingmodelScene = gltf.scene;
  cards[0] = BrandingmodelScene;
  BrandingmodelScene.scale.set(0.2, 0.2, 0.2);
  BrandingmodelScene.position.set(Math.sin(THREE.MathUtils.degToRad(1 * 360 / 9)) * 3, -8, Math.cos(THREE.MathUtils.degToRad(1 * 360 / 9)) * 3);
  BrandingmodelScene.rotation.y = THREE.MathUtils.degToRad(1 * 360 / 9);
  Brandingbutton = BrandingmodelScene.getObjectByName("Button");
  BrandingmodelScene.traverse((child) => {
    if (child.isMesh) {
      child.material.envMapIntensity = 0;
    }
  });
  cardInitialY['branding'] = 0;
  cardgroup.add(BrandingmodelScene);
  hideLoader();
});

aboutMeLoader.load("https://jhfyj.github.io/website-code/models/aboutme.glb", (gltf) => {
  AboutMemodelScene = gltf.scene;
  cards[1] = AboutMemodelScene;
  Aboutbutton = AboutMemodelScene.getObjectByName("Button");
  AboutMemodelScene.position.set(Math.sin(THREE.MathUtils.degToRad(0 * 360 / 9)) * 3, -8, Math.cos(THREE.MathUtils.degToRad(0 * 360 / 9)) * 3);
  AboutMemodelScene.rotation.y = THREE.MathUtils.degToRad(0 * 360 / 9);
  AboutMemodelScene.scale.set(0.2, 0.2, 0.2);
  AboutMemodelScene.traverse((child) => {
    if (child.isMesh) {
      child.material.envMapIntensity = 0;
    }
  });
  cardInitialY['aboutme'] = 0;
  cardgroup.add(AboutMemodelScene);
  hideLoader();
});

graphicDesignLoader.load("https://jhfyj.github.io/website-code/models/graphicdesign.glb", (gltf) => {
  const GraphicDesignmodelScene = gltf.scene;
  cards[2] = GraphicDesignmodelScene;
  Graphicbutton = GraphicDesignmodelScene.getObjectByName("button");
  GraphicDesignmodelScene.position.set(Math.sin(THREE.MathUtils.degToRad(2 * 360 / 9)) * 3, -8, Math.cos(THREE.MathUtils.degToRad(2 * 360 / 9)) * 3);
  GraphicDesignmodelScene.rotation.y = THREE.MathUtils.degToRad(2 * 360 / 9);
  GraphicDesignmodelScene.scale.set(0.2, 0.2, 0.2);
  GraphicDesignmodelScene.traverse((child) => {
    if (child.isMesh) {
      child.material.envMapIntensity = 0;
    }
  });
  cardInitialY['graphic'] = 0;
  cardgroup.add(GraphicDesignmodelScene);
  hideLoader();
});

immersiveexperieinceLoader.load("https://jhfyj.github.io/website-code/models/immersive.glb", (gltf) => {
  const ImmersiveExperiencemodelScene = gltf.scene;
  cards[3] = ImmersiveExperiencemodelScene;
  ImmersiveExperiencemodelScene.position.set(Math.sin(THREE.MathUtils.degToRad(3 * 360 / 9)) * 3, -8, Math.cos(THREE.MathUtils.degToRad(3 * 360 / 9)) * 3);
  ImmersiveExperiencemodelScene.rotation.y = THREE.MathUtils.degToRad(3 * 360 / 9);
  ImmersiveExperiencemodelScene.scale.set(0.2, 0.2, 0.2);
  Immersivebutton = ImmersiveExperiencemodelScene.getObjectByName("button");
  ImmersiveExperiencemodelScene.traverse((child) => {
    if (child.isMesh) {
      child.material.envMapIntensity = 0;
    }
  });
  cardInitialY['immersive'] = 0;
  cardgroup.add(ImmersiveExperiencemodelScene);
  hideLoader();
});

motiongraphicLoader.load("https://jhfyj.github.io/website-code/models/motiongraphic.glb", (gltf) => {
  const MotionGraphicModelScene = gltf.scene;
  cards[4] = MotionGraphicModelScene;
  MotionGraphicModelScene.scale.set(0.2, 0.2, 0.2);
  MotionGraphicModelScene.position.set(Math.sin(THREE.MathUtils.degToRad(4 * 360 / 9)) * 3, -8, Math.cos(THREE.MathUtils.degToRad(4 * 360 / 9)) * 3);
  MotionGraphicModelScene.rotation.y = THREE.MathUtils.degToRad(4 * 360 / 9);
  MotionGraphicbutton = MotionGraphicModelScene.getObjectByName("button");
  MotionGraphicModelScene.traverse((child) => {
    if (child.isMesh) {
      child.material.envMapIntensity = 0;
    }
  });
  cardInitialY['motion'] = 0;
  cardgroup.add(MotionGraphicModelScene);
  hideLoader();
});

fineartLoader.load("https://jhfyj.github.io/website-code/models/fineart.glb", (gltf) => {
  const FineArtModelScene = gltf.scene;
  cards[5] = FineArtModelScene;
  FineArtModelScene.scale.set(0.2, 0.2, 0.2);
  FineArtModelScene.position.set(Math.sin(THREE.MathUtils.degToRad(5 * 360 / 9)) * 3, -8, Math.cos(THREE.MathUtils.degToRad(5 * 360 / 9)) * 3);
  FineArtModelScene.rotation.y = THREE.MathUtils.degToRad(5 * 360 / 9);
  FineArtbutton = FineArtModelScene.getObjectByName("button");
  FineArtModelScene.traverse((child) => {
    if (child.isMesh) {
      child.material.envMapIntensity = 0;
    }
  });
  cardInitialY['fineart'] = 0;
  cardgroup.add(FineArtModelScene);
  hideLoader();
});

installationLoader.load("https://jhfyj.github.io/website-code/models/installation.glb", (gltf) => {
  const InstallationModelScene = gltf.scene;
  cards[6] = InstallationModelScene;
  InstallationModelScene.scale.set(0.3, 0.3, 0.3);
  InstallationModelScene.position.set(Math.sin(THREE.MathUtils.degToRad(6 * 360 / 9)) * 3, -8, Math.cos(THREE.MathUtils.degToRad(6 * 360 / 9)) * 3);
  InstallationModelScene.rotation.y = THREE.MathUtils.degToRad(6 * 360 / 9);
  Installationbutton = InstallationModelScene.getObjectByName("button");
  InstallationModelScene.traverse((child) => {
    if (child.isMesh) {
      child.material.envMapIntensity = 0;
    }
  });
  cardInitialY['installation'] = 0;
  cardgroup.add(InstallationModelScene);
  hideLoader();
});

uiuxLoader.load("https://jhfyj.github.io/website-code/models/uiux.glb", (gltf) => {
  const UiUxModelScene = gltf.scene;
  cards[7] = UiUxModelScene;
  UiUxModelScene.scale.set(0.3, 0.3, 0.3);
  UiUxModelScene.position.set(Math.sin(THREE.MathUtils.degToRad(8 * 360 / 9)) * 3, -8, Math.cos(THREE.MathUtils.degToRad(8 * 360 / 9)) * 3);
  UiUxModelScene.rotation.y = THREE.MathUtils.degToRad(8 * 360 / 9);
  UiUxbutton = UiUxModelScene.getObjectByName("button");
  UiUxModelScene.traverse((child) => {
    if (child.isMesh) {
      child.material.envMapIntensity = 0;
    }
  });
  cardInitialY['uiux'] = 0;
  cardgroup.add(UiUxModelScene);
  hideLoader();
});

afterdarkLoader.load("https://jhfyj.github.io/website-code/models/afterdark.glb", (gltf) => {
  const AfterdarkModelScene = gltf.scene;
  cards[8] = AfterdarkModelScene;
  AfterdarkModelScene.scale.set(0.2, 0.2, 0.2);
  AfterdarkModelScene.position.set(Math.sin(THREE.MathUtils.degToRad(7 * 360 / 9)) * 3, -8, Math.cos(THREE.MathUtils.degToRad(7 * 360 / 9)) * 3);
  AfterdarkModelScene.rotation.y = THREE.MathUtils.degToRad(7 * 360 / 9);
  Afterdarkbutton = AfterdarkModelScene.getObjectByName("button");
  AfterdarkModelScene.traverse((child) => {
    if (child.isMesh) {
      child.material.envMapIntensity = 0;
    }
  });
  cardInitialY['afterdark'] = 0;
  cardgroup.add(AfterdarkModelScene);
  hideLoader();
});

scene.add(cardgroup);

// Initialize the camera
const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;
camera.position.y = 0;

// Store initial camera position
// const initialCameraY = 0;

// Initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Lighting
const directionalLight = new THREE.DirectionalLight(0xFFF5A7, 3);
directionalLight.position.set(0.5, 0.2, 0.6);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xA7D7FF, 3);
directionalLight2.position.set(-0.5, -0.3, 0.6);
scene.add(directionalLight2);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableRotate = false;
controls.enableZoom = false;
controls.enablePan = false;
controls.minPolarAngle = Math.PI / 2 - THREE.MathUtils.degToRad(10);
controls.maxPolarAngle = Math.PI / 2 + THREE.MathUtils.degToRad(10);

let isDragging = false;
let previousMouseX = 0;

// Get references to HTML overlay elements
const hiText = document.getElementById('hi-text');
const descriptionPanel = document.getElementById('description-panel');
const socialLinks = document.getElementById('social-links');

// Scroll handling
let totalScroll = 0;

window.addEventListener('wheel', (e) => {
  if (!introComplete) {
    e.preventDefault();
    totalScroll += e.deltaY;
    scrollProgress = Math.max(0, Math.min(INTRO_SCROLL_LENGTH, totalScroll / 300));
    updateIntroAnimation();
  } else {
    const scrollDelta = e.deltaY;
    cardgroup.rotation.y += scrollDelta * 0.002;
    targetRotation = null;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      snaptoNearestCard();
    }, 100);
  }
}, { passive: false });

function updateIntroAnimation() {
  const p = scrollProgress;

  // ✏️ CHANGED: Stage 1 no longer "types" via scroll.
  // Typing happens on load now. We simply keep Hi visible until scroll passes 0.5.
  if (p <= 0.5) {
    // keep it visible; do not overwrite textContent here
    if (hiText) hiText.style.opacity = "1";
  }

  // Stage 2: Fade out "Hi!" and bring in card + panels (0.5 to 1.5)
  else if (p <= 1.5) {
    const fadeProgress = (p - 0.5);

    // fade out hi
    hiText.style.opacity = Math.max(0, 1 - fadeProgress);

    const panelProgress = Math.min(1, fadeProgress);
    descriptionPanel.style.opacity = panelProgress;
    descriptionPanel.style.pointerEvents = panelProgress > 0.5 ? 'auto' : 'none';

    socialLinks.style.opacity = panelProgress;
    socialLinks.style.pointerEvents = panelProgress > 0.5 ? 'auto' : 'none';

    // Bring about card from top (this does NOT require camera movement)
    if (AboutMemodelScene) {
      const cardProgress = Math.min(1, fadeProgress * 1.2);
      const startY = 10;
      const endY = 0;
      AboutMemodelScene.position.y = startY + (endY - startY) * easeOutCubic(cardProgress);
      AboutMemodelScene.visible = true;
    }

    // Keep other cards hidden/low during this stage
    cards.forEach((card) => {
      if (card && card !== AboutMemodelScene) {
        card.position.y = 8;
      }
    });
  }

  // ✏️ CHANGED: Stage 3 - DO NOT MOVE CAMERA (no perspective drift)
  else if (p <= 3) {
    const moveProgress = (p - 1.5) / 1.5;

    // Drift Hi! up (2D overlay only)
    hiText.style.transform = `translate(-50%, calc(-50% - ${moveProgress * 100}vh))`;

    // ✅ ADDED: keep camera fixed (prevents “cards getting smaller” feeling)
    camera.position.y = 0;  // or whatever you want locked to
    camera.position.z = 5;  // ensure it never changes

    // Bring other cards up from below
    cards.forEach((card) => {
      if (card && card !== AboutMemodelScene) {
        const startY = -8;
        const endY = 0;
        card.position.y = startY + (endY - startY) * easeOutCubic(moveProgress);
      }
    });

    // About card stays at y=0
    if (AboutMemodelScene) {
      AboutMemodelScene.position.y = 0;
    }

    if (moveProgress >= 0.99) {
      introComplete = true;
      hiText.style.display = 'none';
    }
  }
}


function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

// Mouse move for card tilt during intro
window.addEventListener('mousemove', (e) => {
  if (!introComplete && AboutMemodelScene && scrollProgress > 0.5 && scrollProgress < 1.5) {
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    
    AboutMemodelScene.rotation.x = mouseY * 0.1;
    AboutMemodelScene.rotation.z = -mouseX * 0.1;
  }
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

canvas.addEventListener("click", (event) => {
  if (!introComplete) return;
  
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  checkButtonIntersections();
});

canvas.addEventListener("touchstart", (event) => {
  if (!introComplete) return;
  
  event.preventDefault();
  getNormalizedPointer(event);
  checkButtonIntersections();
}, { passive: false });

function checkButtonIntersections() {
  if (Aboutbutton) {
    const Aboutintersects = raycaster.intersectObject(Aboutbutton, true);
    if (Aboutintersects.length > 0) {
      sendSignal();
      window.open("https://hfyj-art.com/about/", "_top");
    }
  }
  if (Graphicbutton) {
    const Graphicintersects = raycaster.intersectObject(Graphicbutton, true);
    if (Graphicintersects.length > 0) {
      sendSignal();
      window.open("https://hfyj-art.com/graphicdesign/", "_top");
    }
  }
  if (Brandingbutton) {
    const Brandingintersects = raycaster.intersectObject(Brandingbutton, true);
    if (Brandingintersects.length > 0) {
      sendSignal();
      window.open("https://hfyj-art.com/branding/", "_top");
    }
  }
  if (MotionGraphicbutton) {
    const MotionGraphicintersects = raycaster.intersectObject(MotionGraphicbutton, true);
    if (MotionGraphicintersects.length > 0) {
      sendSignal();
      window.open("https://hfyj-art.com/motiongraphic/", "_top");
    }
  }
  if (Immersivebutton) {
    const Immersiveintersects = raycaster.intersectObject(Immersivebutton, true);
    if (Immersiveintersects.length > 0) {
      sendSignal();
      window.open("https://hfyj-art.com/immersiveexperience/", "_top");
    }
  }
  if (FineArtbutton) {
    const FineArtintersects = raycaster.intersectObject(FineArtbutton, true);
    if (FineArtintersects.length > 0) {
      sendSignal();
      window.open("https://hfyj-art.com/fineart/", "_top");
    }
  }
  if (Installationbutton) {
    const Installationintersects = raycaster.intersectObject(Installationbutton, true);
    if (Installationintersects.length > 0) {
      sendSignal();
      window.open("https://hfyj-art.com/installations/", "_top");
    }
  }
  if (UiUxbutton) {
    const UiUxintersects = raycaster.intersectObject(UiUxbutton, true);
    if (UiUxintersects.length > 0) {
      sendSignal();
      window.open("https://hfyj-art.com/uiux/", "_top");
    }
  }
  if (Afterdarkbutton) {
    const Afterdarkintersects = raycaster.intersectObject(Afterdarkbutton, true);
    if (Afterdarkintersects.length > 0) {
      sendSignal();
      window.open("https://hfyj-art.com/afterdark/", "_top");
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
  const deltaX = e.clientX - previousMouseX;
  previousMouseX = e.clientX;
  cardgroup.rotation.y += deltaX * 0.003;
});

const clock = new THREE.Clock();
let previousTime = 0;

const renderloop = () => {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;

  controls.update();
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
};

renderloop();

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
    document.getElementById("loader").style.display = "none";
    console.log("All models loaded.");
  }
}