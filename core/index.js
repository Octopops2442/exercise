import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "../node_modules/three/build/three.module.js";
import { plane, spotLight, light } from "./object.js";
import { CharacterControls } from "./charactercontrols.js";

if (typeof window != "undefined") {
  let keypressed = null;
  const scene = new THREE.Scene();
  var loader = new GLTFLoader();
  const camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 15, 35);

  scene.add(plane);
  scene.add(spotLight);
  scene.add(light);

  let mixer;
  // let characterControls;
  let actions = [];
  let toggle = true;

  loader.load(
    "../Models/mod.glb",
    function (gltf) {
      const human = gltf.scene;
      mixer = new THREE.AnimationMixer(human);
      const clips = gltf.animations;

      const sit = THREE.AnimationClip.findByName(clips, "Situps");
      const situps = mixer.clipAction(sit);
      actions.push(situps);
      situps.play();
      // situps.loop = THREE.LoopOnce;

      // const stand = THREE.AnimationClip.findByName(clips, "StandToIdle");
      // const standAction = mixer.clipAction(stand);
      // actions.push(standAction);
      // stand.loop = THREE.LoopOnce;

      const plank = THREE.AnimationClip.findByName(clips, "StartPlank");
      const plankAction = mixer.clipAction(plank);
      actions.push(plankAction);
      scene.add(human);
    },
    undefined,
    function (error) {
      console.log(error);
    }
  );

  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    if (mixer) {
      mixer.update(clock.getDelta());
    }
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);

  //Event Listners

  document.addEventListener("keydown", (e) => {
    if (!toggle) {
      actions[1].stop();
      actions[0].play();
    } else {
      actions[0].stop();
      actions[1].play();
      // actions[1].loop = THREE.LoopOnce;
      // actions[2].play();
    }
    toggle = !toggle;
    keypressed = e.key;
  });
}
