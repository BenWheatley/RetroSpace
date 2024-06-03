import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById("3dCanvas").appendChild( renderer.domElement );
window.game = {};

///

import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const loader = new OBJLoader();

loader.load(
	// resource URL
	'assets/models/shuttle.obj',
	// called when resource is loaded
	function ( object ) {
        // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); // TODO: doesn't work, and I'd need a better material (shader?) anyway
        // const shuttle = new THREE.Mesh( object.mesh, material );
        // scene.add( shuttle );
        window.game.shuttle = object;
		scene.add( object );
	},
	// called when loading is in progresses
	function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
	// called when loading has errors
	function ( error ) { console.log( 'An error happened' ); }
);

const light = new THREE.PointLight(0x00ff00, 1000)
light.position.set(10, 10, 10)
scene.add(light)

camera.position.z = 5;

function animate() {
	renderer.render( scene, camera );
    if (window.game.shuttle == undefined) { return; }
    window.game.shuttle.rotation.x += 0.01;
    window.game.shuttle.rotation.y += 0.01;
}
renderer.setAnimationLoop( animate );