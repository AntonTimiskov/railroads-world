var THREE = require('three');

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 10;
camera.position.y = 2;
camera.position.x = 0;

var alight = new THREE.AmbientLight( 0xf0f0f0 ); // soft white light
scene.add( alight );

var light = new THREE.PointLight( 0x404040, 2, 1000 );
light.position.set( 150, 150, 150 );
scene.add( light );

module.exports.scene = scene;
module.exports.camera = camera;
