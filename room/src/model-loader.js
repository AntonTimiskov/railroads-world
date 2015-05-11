'use strict';

let THREE = require('three');
let Promise = require('bluebird');
let assert = require('assert');
let _ = require('lodash');

require("threeobjloader");
require("threemtlloader");
require("threeobjmtlloader");

var log = require('./log.js');

class ModelLoader {

  constructor() {
  }

  load(model, next) {

    assert( model, 'Model file have to be specified' );
    assert( _.isObject(model), 'Model must be described with an object' );
    let modelname = model.name;
    log.debug('ModelLoader:', 'loading', modelname);

    let mtlfile = model.mtl;
    let objfile = model.obj;
    let scale = model.scale || 1;

    assert( mtlfile, 'MTL file have to be specified' );
    assert( objfile, 'OBJ file have to be specified' );

    let loader = new THREE.OBJMTLLoader();
    loader.load( objfile, mtlfile, ( object3d ) => {

      assert( object3d, 'Could not load "'+model+'" or it\'s dependency' );

      object3d.scale.multiplyScalar(1/scale)

      log.debug('ModelLoader:', modelname, 'loaded');

      next(null, object3d);
    },
    this.onProgress('loading progress'),
    (err) => {

      log.error('ModelLoader:',err);
      next(err);
    });
  }

  onProgress(msg) {

    return (e) => {

      log.debug('ModelLoader:', msg, parseInt(100 * e.loaded / e.total), '%' );
    }
  }
}

module.exports.loader = new ModelLoader();
