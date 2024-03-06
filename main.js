import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.TorusKnotGeometry( 13, 3, 100, 16 );
const material = new THREE.MeshStandardMaterial( { color: 0xff6347 } );
const torus = new THREE.Mesh( geometry, material );

scene.add( torus );

const pointLight = new THREE.PointLight(0xffffff);
pointLight.intensity = 150;
pointLight.position.set(0,0,0);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 1.5;

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(5,5,5);
directionalLight.intensity = 1;
scene.add(pointLight, ambientLight, directionalLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper);

camera.position.z = 50;

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() { 
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( { color: Math.random() * 0xFFFFFF << 0 } );
    const star = new THREE.Mesh( geometry, material );

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(100).fill().forEach(addStar); // adds random 300 stars to the scene

const avatarTexture = new THREE.TextureLoader().load('avatar.jpg');
const avatar = new THREE.Mesh(
    new THREE.BoxGeometry(8,8,8),
    new THREE.MeshBasicMaterial({ map: avatarTexture })
);

avatar.position.x = 30;

scene.add(avatar); // adds avatar cube to the scene

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

function animate() {
	requestAnimationFrame( animate );

	torus.rotation.x += 0.01;
	torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    avatar.rotation.x += 0.01;
	avatar.rotation.y += 0.005;
    avatar.rotation.z += 0.01;

	renderer.render( scene, camera );
}

if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}