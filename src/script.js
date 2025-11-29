import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// initialize the scene
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

let targetRotation= null;
const snapSpeed=0.1;
const cardCount = 9;

let scrollTimeout = null;



brandingLoader.load("https://jhfyj.github.io/website-code/models/branding.glb", (gltf) => {
  const BrandingmodelScene = gltf.scene;
  cards[0] = BrandingmodelScene;

  // BrandingmodelScene.position.set(0, 0, 0);
  BrandingmodelScene.scale.set(0.2, 0.2, 0.2);
  BrandingmodelScene.position.set(Math.sin(THREE.MathUtils.degToRad(1* 360/9)) * 3, 0, Math.cos(THREE.MathUtils.degToRad(1* 360/9)) * 3);
  BrandingmodelScene.rotation.y = THREE.MathUtils.degToRad(1* 360/9);

 Brandingbutton = BrandingmodelScene.getObjectByName("Button");
  console.log("About Button object:", Brandingbutton);

  BrandingmodelScene.traverse((child) => {
    if (child.isMesh) {
      child.material.envMapIntensity = 0;
    }
  });
  // scene.add(BrandingmodelScene);
  cardgroup.add(BrandingmodelScene);
  console.log("Model Branding children:", BrandingmodelScene.children);
});



aboutMeLoader.load("https://jhfyj.github.io/website-code/models/aboutme.glb", (gltf) => {
  const AboutMemodelScene = gltf.scene;
  cards[1] = AboutMemodelScene;

  // console.log(AboutMemodelScene);
 Aboutbutton = AboutMemodelScene.getObjectByName("Button");
  console.log("About Button object:", Aboutbutton);
  AboutMemodelScene.position.set(Math.sin(THREE.MathUtils.degToRad(8* 360/9)) * 3, 0, Math.cos(THREE.MathUtils.degToRad(8* 360/9)) * 3);
  AboutMemodelScene.rotation.y = THREE.MathUtils.degToRad(8* 360/9);
  AboutMemodelScene.scale.set(0.2, 0.2, 0.2);
  AboutMemodelScene.traverse((child) => {
    if (child.isMesh) {
      child.material.envMapIntensity = 0;
    }
  });
  // scene.add(AboutMemodelScene);
  cardgroup.add(AboutMemodelScene);
  console.log("Model About children:", AboutMemodelScene.children);
});

graphicDesignLoader.load("https://jhfyj.github.io/website-code/models/graphicdesign.glb", (gltf) => {
  
  const GraphicDesignmodelScene = gltf.scene;

  // console.log(GraphicDesignmodelScene);
  Graphicbutton = GraphicDesignmodelScene.getObjectByName("button");
  console.log("Loaded Graphic button:", Graphicbutton);
  GraphicDesignmodelScene.position.set(Math.sin(THREE.MathUtils.degToRad(2* 360/9)) * 3, 0, Math.cos(THREE.MathUtils.degToRad(2* 360/9)) * 3);
  GraphicDesignmodelScene.rotation.y = THREE.MathUtils.degToRad(2* 360/9);
  GraphicDesignmodelScene.scale.set(0.2, 0.2, 0.2);
  GraphicDesignmodelScene.traverse((child) => {
    if (child.isMesh) {
      child.material.envMapIntensity = 0;
    }
    
  });
  // scene.add(GraphicDesignmodelScene);
  console.log("Graphic Design:", GraphicDesignmodelScene.children);
  cardgroup.add(GraphicDesignmodelScene);

});

immersiveexperieinceLoader.load("https://jhfyj.github.io/website-code/models/immersive.glb", (gltf) => {
  console.log("MODEL LOADED:", gltf);
  
  const ImmersiveExperiencemodelScene = gltf.scene;
  cards[3] = ImmersiveExperiencemodelScene;


  // console.log("Button object:", button);
  // ImmersiveExperiencemodelScene.position.set(6, 0, 0);
  ImmersiveExperiencemodelScene.position.set(Math.sin(THREE.MathUtils.degToRad(3* 360/9)) * 3, 0, Math.cos(THREE.MathUtils.degToRad(3* 360/9)) * 3);
  ImmersiveExperiencemodelScene.rotation.y = THREE.MathUtils.degToRad(3* 360/9);
  ImmersiveExperiencemodelScene.scale.set(0.2, 0.2, 0.2);
  Immersivebutton = ImmersiveExperiencemodelScene.getObjectByName("button");
  console.log("Immersive button:", Immersivebutton);
  ImmersiveExperiencemodelScene.traverse((child) => {
    if (child.isMesh) {
      child.material.envMapIntensity = 0;
    }
  });
  // scene.add(ImmersiveExperiencemodelScene);
      cardgroup.add(ImmersiveExperiencemodelScene);

  // console.log("Model children:", ImmersiveExperiencemodelScene.children);
});

motiongraphicLoader.load("https://jhfyj.github.io/website-code/models/motiongraphic.glb", (gltf) => {
  const MotionGraphicModelScene = gltf.scene;
  cards[0] = MotionGraphicModelScene;

  // MotionGraphicModelScene.position.set(0, 0, 0);
  MotionGraphicModelScene.scale.set(0.2, 0.2, 0.2);
  MotionGraphicModelScene.position.set(Math.sin(THREE.MathUtils.degToRad(4* 360/9)) * 3, 0, Math.cos(THREE.MathUtils.degToRad(4* 360/9)) * 3);
  MotionGraphicModelScene.rotation.y = THREE.MathUtils.degToRad(4* 360/9);

 MotionGraphicbutton = MotionGraphicModelScene.getObjectByName("button");
  console.log("Motion Graphic button object:", MotionGraphicbutton);
  MotionGraphicModelScene.traverse((child) => {
    if (child.isMesh) {
      child.material.envMapIntensity = 0;
    }
  });
  // scene.add(MotionGraphicModelScene);
  cardgroup.add(MotionGraphicModelScene);
  // console.log("Model Branding children:", MotionGraphicModelScene.children);
});

fineartLoader.load("https://jhfyj.github.io/website-code/models/fineart.glb", (gltf) => {
  const FineArtModelScene = gltf.scene;
  cards[5] = FineArtModelScene;

  // MotionGraphicModelScene.position.set(0, 0, 0);
  FineArtModelScene.scale.set(0.2, 0.2, 0.2);
  FineArtModelScene.position.set(Math.sin(THREE.MathUtils.degToRad(5* 360/9)) * 3, 0, Math.cos(THREE.MathUtils.degToRad(5* 360/9)) * 3);
  FineArtModelScene.rotation.y = THREE.MathUtils.degToRad(5* 360/9);

 FineArtbutton = FineArtModelScene.getObjectByName("button");
  console.log("Fineart object:", FineArtbutton);
  FineArtModelScene.traverse((child) => {
    if (child.isMesh) {
      child.material.envMapIntensity = 0;
    }
  });
  // scene.add(FineArtModelScene);
  cardgroup.add(FineArtModelScene);
  // console.log("Model Branding children:", FineArtModelScene.children);
});

installationLoader.load("https://jhfyj.github.io/website-code/models/installation.glb", (gltf) => {
  const InstallationModelScene = gltf.scene;
  cards[6] = InstallationModelScene;

  InstallationModelScene.scale.set(0.3, 0.3, 0.3);
  InstallationModelScene.position.set(Math.sin(THREE.MathUtils.degToRad(6* 360/9)) * 3, 0, Math.cos(THREE.MathUtils.degToRad(6* 360/9)) * 3);
  InstallationModelScene.rotation.y = THREE.MathUtils.degToRad(6* 360/9);

  Installationbutton = InstallationModelScene.getObjectByName("button");
  console.log("Installation object:", Installationbutton);
  InstallationModelScene.traverse((child) => {
    if (child.isMesh) {
      child.material.envMapIntensity = 0;
    }
  });
  // scene.add(InstallationModelScene);
  cardgroup.add(InstallationModelScene);
});

uiuxLoader.load("https://jhfyj.github.io/website-code/models/uiux.glb", (gltf) => {
  const UiUxModelScene = gltf.scene;
  cards[7] = UiUxModelScene;

  UiUxModelScene.scale.set(0.3, 0.3, 0.3);
  UiUxModelScene.position.set(Math.sin(THREE.MathUtils.degToRad(0* 360/9)) * 3, 0, Math.cos(THREE.MathUtils.degToRad(0* 360/9)) * 3);
  UiUxModelScene.rotation.y = THREE.MathUtils.degToRad(0* 360/9);
  UiUxbutton = UiUxModelScene.getObjectByName("button");
  console.log("Installation object:", UiUxbutton);
  UiUxModelScene.traverse((child) => {
    if (child.isMesh) {
      child.material.envMapIntensity = 0;
    }
  });
  // scene.add(UiUxModelScene);
  cardgroup.add(UiUxModelScene);
});

afterdarkLoader.load("https://jhfyj.github.io/website-code/models/afterdark.glb", (gltf) => {
  const AfterdarkModelScene = gltf.scene;
  cards[8] = AfterdarkModelScene; 
  AfterdarkModelScene.scale.set(0.2, 0.2, 0.2);
  AfterdarkModelScene.position.set(Math.sin(THREE.MathUtils.degToRad(7* 360/9)) * 3, 0, Math.cos(THREE.MathUtils.degToRad(7* 360/9)) * 3);
  AfterdarkModelScene.rotation.y = THREE.MathUtils.degToRad(7* 360/9);
  Afterdarkbutton = AfterdarkModelScene.getObjectByName("button");
  console.log("Afterdark object:", Afterdarkbutton);
  AfterdarkModelScene.traverse((child) => {
    if (child.isMesh) {
      child.material.envMapIntensity = 0;
    }
  });
  // scene.add(AfterdarkModelScene);
  cardgroup.add(AfterdarkModelScene);
});


scene.add(cardgroup);


// initialize the camera
const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xFFF5A7, 3);
directionalLight.position.set(0.5,0.2,0.6);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xA7D7FF, 3);
directionalLight2.position.set(-0.5,-0.3, 0.6);
scene.add(directionalLight2);

// const skyColor = 0xB1E1FF;  // light blue
// const groundColor = 0xB97A20;  // brownish orange

// const skylight = new THREE.HemisphereLight
// (skyColor, 
//   groundColor, 
//   4
// );

// skylight.position.set(0, 20, 0);
// scene.add(skylight);

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableRotate = false;
controls.enableZoom = false;
controls.enablePan = false;
controls.minPolarAngle = Math.PI / 2 - THREE.MathUtils.degToRad(10);  // 90 degrees
controls.maxPolarAngle = Math.PI / 2 + THREE.MathUtils.degToRad(10);  // 90 degrees

let isDragging = false;
let previousMouseX = 0;


window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener("click", (event) => {
  // convert mouse to NDC
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  if (Aboutbutton) {
    const Aboutintersects = raycaster.intersectObject(Aboutbutton, true);
    if (Aboutintersects.length > 0) {
      sendSignal();
      window.location.href = "https://hfyj-art.com/about/";
    }
  }
   if (Graphicbutton){
    const Graphicintersects = raycaster.intersectObject(Graphicbutton, true);
    if (Graphicintersects.length > 0) {
      sendSignal();
      window.location.href = "https://hfyj-art.com/graphicdesign/";
    }
  }
     if (Brandingbutton){
    const Brandingintersects = raycaster.intersectObject(Brandingbutton, true);
    if (Brandingintersects.length > 0) {
      sendSignal();
      window.location.href = "https://hfyj-art.com/branding/";
    }
  }
  if (MotionGraphicbutton){
    const MotionGraphicintersects = raycaster.intersectObject(MotionGraphicbutton, true);
    if (MotionGraphicintersects.length > 0) {
      sendSignal();
      window.location.href = "https://hfyj-art.com/motiongraphic/";
    }
  }
    if (Immersivebutton){
    const Immersiveintersects = raycaster.intersectObject(Immersivebutton, true);
    if (Immersiveintersects.length > 0) {
      sendSignal();
      window.location.href = "https://hfyj-art.com/immersiveexperience/";
    }
  }
      if (FineArtbutton){
    const FineArtintersects = raycaster.intersectObject(FineArtbutton, true);
    if (FineArtintersects.length > 0) {
      sendSignal();
      window.location.href = "https://hfyj-art.com/fineart/";
    }
  }
    if (Installationbutton){
    const Installationintersects = raycaster.intersectObject(Installationbutton, true);
    if (Installationintersects.length > 0) {
      sendSignal();
      window.location.href = "https://hfyj-art.com/installations/";
    }
  }

      if (UiUxbutton){
    const UiUxintersects = raycaster.intersectObject(UiUxbutton, true);
    if (UiUxintersects.length > 0) {
      sendSignal();
      window.location.href = "https://hfyj-art.com/uiux/";
    }
  }
      if (Afterdarkbutton){
    const Afterdarkintersects = raycaster.intersectObject(Afterdarkbutton, true);
    if (Afterdarkintersects.length > 0) {
      sendSignal();
      window.location.href = "https://hfyj-art.com/afterdark/";
    }
  }
});
// pointer down on the canvas
canvas.addEventListener("pointerdown", (e) => {
  isDragging = true;
  previousMouseX = e.clientX;
});

window.addEventListener("load", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// pointer up anywhere
window.addEventListener("pointerup", () => {
  isDragging = false;
snaptoNearestCard() 


});

window.addEventListener("wheel", (e) => {
    const scrollDelta = e.deltaY;
    cardgroup.rotation.y += scrollDelta * 0.002;
    targetRotation = null;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        snaptoNearestCard();
    }, 100); // snap 100 ms after scroll stops
});


// pointer move on the canvas
canvas.addEventListener("pointermove", (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - previousMouseX;
  previousMouseX = e.clientX;
  cardgroup.rotation.y += deltaX * 0.003;
});

// initialize the clock
const clock = new THREE.Clock()
let previousTime = 0

// render the scene
const renderloop = () => {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(renderloop);

  if (!isDragging && targetRotation !== null) {
    const diff = targetRotation - cardgroup.rotation.y;

    if (Math.abs(diff) < 0.001) {
        cardgroup.rotation.y = targetRotation;
        targetRotation = null; // stop snapping
    } else {

        cardgroup.rotation.y += diff * snapSpeed;
    }
}
  
};

renderloop();


function sendSignal() {
  console.log("Signal: Button pressed");
}

// function handleResize() {
//     const width = window.innerWidth;
//     const height = window.innerHeight;

//     // Update camera
//     camera.aspect = width / height;
//     camera.updateProjectionMatrix();

//     // Update renderer
//     renderer.setSize(width, height);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// }

function snaptoNearestCard() {
  const anglePerCard = (Math.PI*2)/cardCount;
let currentRotation = cardgroup.rotation.y % (Math.PI*2);
if (currentRotation < 0) {
  currentRotation += Math.PI*2;
}
const nearestIndex = Math.round(currentRotation / anglePerCard);
targetRotation = nearestIndex*anglePerCard;
}

//hey