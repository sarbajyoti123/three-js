import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';

// const scene = new THREE.Scene();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor("#e5e5e5");
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


camera.position.z = 10;


const geometry = new THREE.PlaneGeometry(5, 5, 10,10);
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );


const animate = function () {
  requestAnimationFrame( animate );

 
  plane.rotation.x += 0.01;
//   plane.rotation.y += 0.01;

  renderer.render( scene, camera );
};

animate();


