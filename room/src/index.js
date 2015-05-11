'use strict';

var THREE = require('three');
let Promise = require('bluebird');

var log = require('./log.js');
var modelLoader = require('./model-loader.js').loader;

var scene = require('./scene.js').scene;
var camera = require('./scene.js').camera;
var light = require('./scene.js').light;
var obj;

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );

var container = document.body;
container.appendChild( renderer.domElement );


// instantiate a loader
var model;
/*model = {
  name: "SmallTrain",
  mtl: 'models/Smalltrain/Smalltrain.mtl',
  obj: 'models/Smalltrain/Smalltrain.obj'
};*/

/*model = {
  name: "SteamTrain",
  mtl: 'models/SteamEngine/STEAMENGINE.mtl',
  obj: 'models/SteamEngine/STEAMENGINE.obj',
  scale: 1/10
}*/

model = {
  name: "LocomotiveTGM3",
  mtl: 'models/LocomotiveTGM3/Locomotive-TGM3.mtl',
  obj: 'models/LocomotiveTGM3/Locomotive-TGM3.obj',
  scale: 4
}


/*model = {
  name: "SpaceFighter01",
  mtl: "models/SpaceFighter01/SpaceFighter01.mtl",
  obj: "models/SpaceFighter01/SpaceFighter01.obj",
  scale: 5
}*/

Promise.promisify(modelLoader.load)
.call(modelLoader, model)
.then( (o) => {

  obj = o;
  obj.matrixAutoUpdate = true;
  scene.add( obj );

  renderer.render( scene, camera );
});

let cam_p = 80;
let cam_y = 0;
let cam_d = 100;

function render() {
	requestAnimationFrame( render );

  let a = camera;
  a.position.y = cam_d * Math.cos(cam_p * Math.PI / 180);
  a.position.x = cam_d * Math.sin(cam_p * Math.PI / 180) * Math.cos(cam_y * Math.PI / 180);
  a.position.z = cam_d * Math.sin(cam_p * Math.PI / 180) * Math.sin(cam_y * Math.PI / 180);
  a.lookAt({
      x: 0,
      y: 0,
      z: 0
  });

  light.position.x = a.position.x;
  light.position.y = a.position.y;
  light.position.z = a.position.z;
  light.lookAt({
      x: 0,
      y: 0,
      z: 0
  });

	renderer.render( scene, camera );
}
render();

container.addEventListener("mousemove", mouseMove, false);
container.addEventListener("mousedown", mouseDown, false);
container.addEventListener("mouseup", mouseUp, false);
container.addEventListener("mousewheel", mouseWheel, false);
container.addEventListener("DOMMouseScroll", mouseWheelDOM, false);
window && window.addEventListener("resize", resize, false);
window && window.addEventListener("contextmenu", contextMenu, false);

function mouseWheel(e){

  e.preventDefault();
  cam_d += e.deltaY * 0.4; // was e.detail
}
let mouseWheelDOM = mouseWheel;

let isAction = false;
function mouseDown(e) {
  e.preventDefault();
  isAction = true;
}
function mouseUp(e) {
  e.preventDefault();
  isAction = false;
}

function mouseMove(e) {

  e.preventDefault();

  if (!isAction) return;

  cam_p -= e.movementY / 10;
  if (cam_p > 99) { cam_p=99; }
  if (cam_p < 56) { cam_p=56; }

  cam_y += e.movementX / 10;
}

function resize(e) {
  e.preventDefault();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function contextMenu(e) {
  e.preventDefault();
}
