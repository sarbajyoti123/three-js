import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls';

let camera;
let scene;
let renderer;
let house;
let container;

function init(){
    container = document.querySelector('.scene');
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(0,0,20);


    const ambient = new THREE.AmbientLight(0x404040,2);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff,2);
    light.position.set(10,10,10);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
    renderer.setSize(container.clientWidth,container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    new OrbitControls(camera,renderer.domElement)

    // load model
    let loader = new GLTFLoader();
    loader.load('./house/scene.gltf',function(gltf){
        scene.add(gltf.scene);
        house = gltf.scene.children[0];
        animate();
    });



}

function animate(){
    requestAnimationFrame(animate);
    house.rotation.z += 0.005;
    renderer.render(scene,camera);
}


init()



// Update on window resize
function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  
window.addEventListener("resize", onWindowResize);
  