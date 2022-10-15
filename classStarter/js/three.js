import * as THREE from "three";
import vertex from "../shaders/vertex.glsl";
import fragment from "../shaders/fragment.glsl";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const three = () => {
  class Sketch {
    constructor() {
      this.webgl = document.querySelector("#app");
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.webgl.appendChild(this.renderer.domElement);

      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      this.camera.position.z = 1;

      this.scene = new THREE.Scene();

      this.addMesh();

      this.time = 0;

      this.controlls();

      this.render();

      this.resize();
    }

    addMesh() {
      //this.geometry = new THREE.PlaneGeometry(1, 1);
      this.geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5, 16, 16, 16);
      this.material = new THREE.ShaderMaterial({
        wireframe: true,
        side: THREE.DoubleSide,
        vertexShader: vertex,
        fragmentShader: fragment,
      });

      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.mesh);
    }

    controlls() {
      this.controll = new OrbitControls(this.camera, this.webgl);
    }

    render() {
      //this.time++;
      //console.log(this.time);
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.01;

      this.renderer.render(this.scene, this.camera);
      window.requestAnimationFrame(this.render.bind(this));
    }

    resize() {
      window.addEventListener("resize", () => {
        let width = innerWidth;
        let height = innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });
    }
  }

  new Sketch();
};
