import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import * as dat from 'dat.gui';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls';
// console.log(OrbitControls);

const raycaster = new THREE.Raycaster();

import gsap from 'gsap';

console.log(gsap)

const gui = new dat.GUI()
// console.log(gui);
const world = {
    plane: {
      width: 16.9,
      height: 16.9,
      widthSegments: 10,
      heightSegments: 10
    }
  }

gui.add(world.plane,'width',1,50).onChange(generatePlane)
gui.add(world.plane,'height',1,50).onChange(generatePlane)
gui.add(world.plane,'widthSegments',1,20).onChange(generatePlane)
gui.add(world.plane,'heightSegments',1,20).onChange(generatePlane)

function generatePlane(){
    planeMesh.geometry.dispose();
    planeMesh.geometry = new THREE.PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegments, world.plane.heightSegments);
    

    const {array} = planeMesh.geometry.attributes.position;

    for (let index = 0; index < array.length; index+=3) {
        const x = array[index];
        const y = array[index+1];
        const z = array[index+2];
        array[index+2] = z + Math.random();
        
    }
    const colors = []
    for (let index = 0; index < planeMesh.geometry.attributes.position.count; index++) {
        colors.push(0,0.19,0.4)
        
    }
    planeMesh.geometry.setAttribute('color',new THREE.BufferAttribute(new Float32Array(colors),3))
}
// generatePlane()

// const raycaster = new THREE.Raycaster();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
// renderer.setClearColor("#e5e5e5");
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild( renderer.domElement );

new OrbitControls(camera,renderer.domElement)

camera.position.z = 10;


const planegeometry = new THREE.PlaneGeometry(5, 5, 10,10);
const planematerial = new THREE.MeshPhongMaterial( {side: THREE.DoubleSide, flatShading: THREE.FlatShading,vertexColors: true} );
const planeMesh = new THREE.Mesh( planegeometry, planematerial );
scene.add( planeMesh );

// console.log(planeMesh)

// console.log(planeMesh);

const {array} = planeMesh.geometry.attributes.position;

for (let index = 0; index < array.length; index+=3) {
    const x = array[index];
    const y = array[index+1];
    const z = array[index+2];
    array[index+2] = z + Math.random();
    
}
generatePlane()
const colors = []
for (let index = 0; index < planeMesh.geometry.attributes.position.count; index++) {
    colors.push(0,0.19,0.4)
    
}
planeMesh.geometry.setAttribute('color',new THREE.BufferAttribute(new Float32Array(colors),3))
console.log(planeMesh.geometry.attributes)


// White Frontdirectional light at half intensity shining from the top.
const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set(0,0,1)
scene.add( light );



// White Backdirectional light at half intensity shining from the top.
const backLight = new THREE.DirectionalLight( 0xffffff, 1 );
backLight.position.set(0,0,-1)
scene.add( backLight );

// Mouse Events & Normalize co-ordinates coz Three js expect 0 in center
const mouse = {
    x: undefined,
    y: undefined
}

function animate() {
    requestAnimationFrame(animate);
  
    // planeMesh.rotation.x += 0.05;
    // planeMesh.rotation.y += 0.05;
  
    renderer.render( scene, camera );
    // update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );
    
    const intersects = raycaster.intersectObject( planeMesh, true );
    // console.log(intersects)
    // console.log(intersects.object);
    if (intersects.length > 0){
        const {color} = intersects[0].object.geometry.attributes
        color.setX(intersects[0].face.a,0.1)
        color.setY(intersects[0].face.b,0.5)
        color.setZ(intersects[0].face.c,1)

        color.setX(intersects[0].face.a,0.1)
        color.setY(intersects[0].face.b,0.5)
        color.setZ(intersects[0].face.c,1)

        color.setX(intersects[0].face.a,0.1)
        color.setY(intersects[0].face.b,0.5)
        color.setZ(intersects[0].face.c,1)
        color.needsUpdate = true
        const initialColor = {
            r:0,
            g:0.19,
            b:0.4
        }
        
        const hoverColor = {
            r:0.1,
            g:0.5,
            b:1
        }
        
        gsap.to(hoverColor,{r:initialColor.r,
            g:initialColor.g,
            b:initialColor.b,
            duration : 1,
            onUpdate: ()=>{

                color.setX(intersects[0].face.a,hoverColor.r)
                color.setY(intersects[0].face.b,hoverColor.g)
                color.setZ(intersects[0].face.c,hoverColor.b)

                color.setX(intersects[0].face.a,hoverColor.r)
                color.setY(intersects[0].face.b,hoverColor.g)
                color.setZ(intersects[0].face.c,hoverColor.b)

                color.setX(intersects[0].face.a,hoverColor.r)
                color.setY(intersects[0].face.b,hoverColor.g)
                color.setZ(intersects[0].face.c,hoverColor.b)
                color.needsUpdate = true
            }
        })
    }
}
  
animate()


addEventListener('mousemove',(event) =>{
    mouse.x = (event.clientX / innerWidth) * 2 - 1
    mouse.y = -(event.clientY / innerHeight) * 2 + 1
    // console.log(mouse);
})





