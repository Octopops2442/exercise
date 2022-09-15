import * as THREE from "../node_modules/three/build/three.module.js";

class CharacterControls {
  model;
  mixer;
  animationsMap;
  currentAction;
  toggle;

  constructor(model, mixer, animationsMap, currentAction) {
    this.model = model;
    this.mixer = mixer;
    this.animationsMap = animationsMap;
    this.currentAction = currentAction;
    this.toggle = true;
  }

  update(delta, keypress) {
    this.mixer.update(delta);
  }
}

export { CharacterControls };
