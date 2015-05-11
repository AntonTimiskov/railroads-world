var THREE = require('three');

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 10;
camera.position.y = 2;
camera.position.x = 0;

// add a ambient light
var light	= new THREE.AmbientLight( 0xffffff );
scene.add( light )

// add a light in front
var light	= new THREE.DirectionalLight('white', 1);
light.position.set(10, 10, 0);
scene.add( light );
// add a light behind
/*var light	= new THREE.DirectionalLight('white', 1);
light.position.set(-10, -10, -0);
scene.add( light );*/

module.exports.scene = scene;
module.exports.camera = camera;
module.exports.light = light;
