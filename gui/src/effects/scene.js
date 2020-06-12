import * as THREE from "three";
import EffectComposer, {RenderPass, ShaderPass,} from "@johh/three-effectcomposer";
// import postvertex from './post/vertex.glsl';
// import postfragment from './post/fragment.glsl';
const createInputEvents = require("simple-input-events");
const event = createInputEvents(window);
let OrbitControls = require("three-orbit-controls")(THREE);

// const clamp = (min, max) => (value) =>
//   value < min ? min : value > max ? max : value;

export default class Sketch {
  constructor(selector) {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    // this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(this.width, this.height);
    this.renderer.sortObjects = false;

    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.container = document.getElementById(selector);
    console.log(this);
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      100,
      1000
    );

    this.cameraDistance = 400;
    this.camera.position.set(0, 0, this.cameraDistance);
    this.camera.lookAt(0, 0, 0);
    this.time = 0;
    this.speed = 0;
    this.targetSpeed = 0;
    this.mouse = new THREE.Vector2();
    this.followMouse = new THREE.Vector2();
    this.prevMouse = new THREE.Vector2();

    this.paused = false;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.settings();
    this.setupResize();

    this.addObjects();

    let images = [...document.querySelectorAll(".js-image")];
    images.forEach((image) => {
      // and we have the width, height and left, top position of the image now!
      let dimensions = image.getBoundingClientRect();
      console.log(image);
      console.log(dimensions);
      // hide original image
      // image.style.display = "none";
      // add 3D object to your scene, according to its HTML brother dimensions
      let mesh = this.createMesh(dimensions);
      this.scene.add(mesh);
    });
    this.composerPass();
    this.resize();
    this.mouseMove();

    this.render();
  }

  mouseMove() {
    // let that = this;
    event.on("move", ({ position, event, inside, dragging }) => {
      // mousemove / touchmove
      this.mouse.x = position[0] / window.innerWidth;
      this.mouse.y = 1 - position[1] / window.innerHeight;
    });
  }

  settings() {
    let that = this;
    this.settings = {
      velo: 0,
      scale: 0,
      colorful: () => {
        // that.makeColorful()
        that.customPass.uniforms.uType.value = 0;
      },
      zoom: () => {
        that.customPass.uniforms.uType.value = 1;
      },
      random: () => {
        that.customPass.uniforms.uType.value = 2;
      },
    };
    // this.gui = new dat.GUI();
    // // this.gui.add(this.settings, "progress", -1, 2, 0.01);
    // // this.gui.add(this.settings, "velo", 0, 1, 0.01);
    // // this.gui.add(this.settings, "scale", 0, 1, 0.01);
    // this.gui.add(this.settings, "colorful");
    // this.gui.add(this.settings, "zoom");
    // this.gui.add(this.settings, "random");
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;

    this.camera.fov =
      2 *
      Math.atan(this.width / this.camera.aspect / (2 * this.cameraDistance)) *
      (180 / Math.PI); // in degrees

    this.customPass.uniforms.resolution.value.y = this.height / this.width;

    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    // let that = this;
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 80, 80);
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        progress: { type: "f", value: 0 },
        angle: { type: "f", value: 0 },
        texture1: { type: "t", value: null },
        texture2: { type: "t", value: null },
        resolution: { type: "v4", value: new THREE.Vector4() },
        uvRate1: {
          value: new THREE.Vector2(1, 1),
        },
      },
      // wireframe: true,
      transparent: true,
      vertexShader: `varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );}`,
      fragmentShader: `uniform float time;
      uniform sampler2D tDiffuse;
      uniform vec2 resolution;
      varying vec2 vUv;
      uniform vec2 uMouse;
      float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
        uv -= disc_center;
        uv*=resolution;
        float dist = sqrt(dot(uv, uv));
        return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
      }
      void main()  {
          vec2 newUV = vUv;
          float c = circle(vUv, uMouse, 0.0, 0.2);
          float r = texture2D(tDiffuse, newUV.xy += c * (0.1 * .5)).x;
          float g = texture2D(tDiffuse, newUV.xy += c * (0.1 * .525)).y;
          float b = texture2D(tDiffuse, newUV.xy += c * (0.1 * .55)).z;
          vec4 color = vec4(r, g, b, 1.);

          gl_FragColor = color;
      }`,
    });
  }

  createMesh(o) {
    let material = this.material.clone();
    let texture = new THREE.Texture(o.image);
    texture.needsUpdate = true;
    // image cover
    let imageAspect = o.iHeight / o.iWidth;
    let a1;
    let a2;
    if (o.height / o.width > imageAspect) {
      a1 = (o.width / o.height) * imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = o.height / o.width / imageAspect;
    }
    texture.minFilter = THREE.LinearFilter;
    material.uniforms.resolution.value.x = o.width;
    material.uniforms.resolution.value.y = o.height;
    material.uniforms.resolution.value.z = a1;
    material.uniforms.resolution.value.w = a2;
    material.uniforms.progress.value = 0;
    material.uniforms.angle.value = 0.3;

    material.uniforms.texture1.value = texture;
    material.uniforms.texture1.value.needsUpdate = true;

    let mesh = new THREE.Mesh(this.geometry, material);

    mesh.scale.set(o.width, o.height, o.width / 2);

    return mesh;
  }

  composerPass() {
    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);

    // //custom shader pass
    // var counter = 0.0;
    var myEffect = {
      uniforms: {
        tDiffuse: { value: null },
        distort: { value: 0 },
        resolution: {
          value: new THREE.Vector2(1, window.innerHeight / window.innerWidth),
        },
        uMouse: { value: new THREE.Vector2(-10, -10) },
        uVelo: { value: 0 },
        uScale: { value: 0 },
        uType: { value: 0 },
        time: { value: 0 },
      },
      vertexShader: `varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );}`,
      fragmentShader: `uniform float time;
      uniform sampler2D tDiffuse;
      uniform vec2 resolution;
      varying vec2 vUv;
      uniform vec2 uMouse;
      float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
        uv -= disc_center;
        uv*=resolution;
        float dist = sqrt(dot(uv, uv));
        return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
      }
      void main()  {
          vec2 newUV = vUv;
          float c = circle(vUv, uMouse, 0.0, 0.2);
          float r = texture2D(tDiffuse, newUV.xy += c * (0.1 * .5)).x;
          float g = texture2D(tDiffuse, newUV.xy += c * (0.1 * .525)).y;
          float b = texture2D(tDiffuse, newUV.xy += c * (0.1 * .55)).z;
          vec4 color = vec4(r, g, b, 1.);

          gl_FragColor = color;
      }`,
    };

    this.customPass = new ShaderPass(myEffect);
    this.customPass.renderToScreen = true;
    this.composer.addPass(this.customPass);
  }

  stop() {
    this.paused = true;
  }

  play() {
    this.paused = false;
    this.render();
  }

  getSpeed() {
    this.speed = Math.sqrt(
      (this.prevMouse.x - this.mouse.x) ** 2 +
        (this.prevMouse.y - this.mouse.y) ** 2
    );

    this.targetSpeed -= 0.1 * (this.targetSpeed - this.speed);
    this.followMouse.x -= 0.1 * (this.followMouse.x - this.mouse.x);
    this.followMouse.y -= 0.1 * (this.followMouse.y - this.mouse.y);

    this.prevMouse.x = this.mouse.x;
    this.prevMouse.y = this.mouse.y;
  }

  render() {
    this.time += 0.05;
    this.getSpeed();
    this.scene.children.forEach((m) => {
      if (m.material.uniforms) {
        m.material.uniforms.angle.value = this.settings.angle;
        m.material.uniforms.time.value = this.time;
      }
    });
    this.customPass.uniforms.time.value = this.time;
    this.customPass.uniforms.uMouse.value = this.followMouse;
    // this.customPass.uniforms.uVelo.value = this.settings.velo;
    this.customPass.uniforms.uVelo.value = Math.min(this.targetSpeed, 0.05);
    this.targetSpeed *= 0.999;
    // this.renderer.render(this.scene, this.camera);
    if (this.composer) this.composer.render();
  }
}
