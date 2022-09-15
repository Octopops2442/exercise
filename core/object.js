import * as THREE from "../node_modules/three/build/three.module.js";

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
  })
);
const spotLight = new THREE.SpotLight(0xffffff);
const light = new THREE.AmbientLight(0x404040);

spotLight.position.set(0, 50, 0);

plane.material.color.setRGB(0.49, 0.78, 0.31);
plane.rotateX(Math.PI / 2);

export { plane, spotLight, light };
