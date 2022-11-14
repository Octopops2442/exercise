import * as THREE from "../node_modules/three/build/three.module.js";

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
  })
);

const wall = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
  })
);

const rWall = new THREE.Mesh(
  new THREE.PlaneGeometry(500, 500),
  new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
  })
);

const lWall = new THREE.Mesh(
  new THREE.PlaneGeometry(500, 500),
  new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
  })
);

const roof = new THREE.Mesh(
  new THREE.PlaneGeometry(500, 500),
  new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
  })
);

const spotLight = new THREE.SpotLight(0xffffff);
const light = new THREE.AmbientLight(0x404040);

spotLight.position.set(0, 50, 0);

plane.material.color.setRGB(0.49, 0.78, 0.31);
plane.rotateX(Math.PI / 2);

wall.material.color.setRGB(0.49, 0.78, 0.31);
wall.position.set(0, 50, -50);

rWall.position.set(50, 0, 0);
rWall.rotateY(Math.PI / 2);

lWall.position.set(-50, 0, 0);
lWall.rotateY(Math.PI / 2);

roof.position.set(0, 50, 0);
roof.rotateX(Math.PI / 2);

export { plane, spotLight, light, wall, rWall, lWall, roof };
