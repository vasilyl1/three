import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 2, 4, 2, 4, 8 );
const material = new THREE.MeshBasicMaterial( { color: 0x049ef4, wireframe:true } );
const cube = new THREE.Mesh( geometry, material );
const sceneFog = new THREE.Fog(0x000000, 0.015, 100);

scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.005;
	cube.rotation.y += 0.005;

	renderer.render( scene, camera );
}

if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}