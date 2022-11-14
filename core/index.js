import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "../node_modules/three/build/three.module.js";
import { plane, spotLight, light, wall, rWall, lWall, roof } from "./object.js";

if (typeof window != "undefined") {
  // let window = document.getElementById("window");
  let keypressed = null;
  const scene = new THREE.Scene();
  var loader = new GLTFLoader();
  const camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 15, 55);

  scene.add(plane);
  scene.add(spotLight);
  scene.add(light);
  scene.add(wall);
  scene.add(rWall);
  scene.add(lWall);
  scene.add(roof);

  let mixer;
  let actions = [];
  let toggle = true;

  loader.load(
    "../Models/change1.glb",
    function (gltf) {
      const human = gltf.scene;
      var mat001 = new THREE.MeshPhysicalMaterial();

      gltf.scene.traverse(async function (child) {
        if (child.isMesh) {
          const m = child;

          child.material = await mat001;
          scene.add(m);
        }
      });
      mixer = new THREE.AnimationMixer(human);

      const clips = gltf.animations;
      const sit = THREE.AnimationClip.findByName(clips, "Squat");
      const situps = mixer.clipAction(sit);

      actions.push(situps);
      situps.play();

      const plank = THREE.AnimationClip.findByName(clips, "Dumbbell");
      const plankAction = mixer.clipAction(plank);

      actions.push(plankAction);

      // human.rotation.y += 1.4;
      // human.rotation.z -= 0.2;
      // human.rotation.x -= 0.2;
      scene.add(human);
    },
    undefined,
    function (error) {
      console.log(error);
    }
  );

  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
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
    }
    toggle = !toggle;
    keypressed = e.key;
  });
}

// Comments

// const parser = gltf.parser;
// const bufferPromises = parser.json.images.map((imageDef) => {
//   return parser.getDependency("bufferView", imageDef.bufferView);
// });
// Promise.all(bufferPromises).then((buffers) => {
//   console.log(buffers); // Array<ArrayBuffer>
// });
// const texture = await parser.getDependency(
//   "texture",
//   0 /* textureIndex */
// );

// part.material = new THREE.MeshPhongMaterial({ map: texture });

// console.log(texture);

// human.material = await new THREE.MeshPhongMaterial({ map: texture });

// actions[1].loop = THREE.LoopOnce;
// actions[2].play();
