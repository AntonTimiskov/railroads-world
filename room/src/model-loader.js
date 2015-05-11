'use strict';

let THREE = require('three');
let Promise = require('bluebird');
let assert = require('assert');
let _ = require('lodash');

require("threeobjloader");
require("threemtlloader");

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

    Promise.all([

      Promise.promisify(this.loadModelObject).call(this, objfile),
      Promise.promisify(this.loadModelMaterials).call(this, mtlfile)
    ])
    .spread( (object, materials) => {

      return Promise.promisify(this.combineOBJAndMTL).call(this, object, materials);
    })
    .then( ( object ) => {

      log.debug('ModelLoader:', modelname, 'loaded');
      next(null, object);
    });
  }

  loadModelMaterials(mtlfile, next){

    assert( mtlfile, 'MTL file have to be specified' );
    console.log('ModelLoader:', mtlfile, 'loading ...' );
    let materialsBase = mtlfile.substr( 0, mtlfile.lastIndexOf( "/" ) + 1 );
    let mtlLoader = new THREE.MTLLoader( materialsBase );
    mtlLoader.load( mtlfile, ( materials ) => {

      assert( mtlfile, 'Could not load "'+mtlfile+'"' );
      console.log('ModelLoader:', mtlfile, 'materials loaded' );
      materials.preload();

      next(null, materials);
    }, this.onProgress('materials loading progress'), (err) => {

      next(err);
    });
  }

  loadModelObject(objfile, next) {

    assert( objfile, 'OBJ file have to be specified' );
    console.log('ModelLoader:', objfile, 'loading ...' );
    let objloader = new THREE.OBJLoader();
    objloader.load( objfile, ( object ) => {

      assert( objfile, 'Could not load "'+objfile+'"' );
      console.log('ModelLoader:', objfile, 'object loaded' );
      next(null, object);
    }, this.onProgress('object loading progress'), (err) => {

      next(err);
    });
  }

  combineOBJAndMTL(object, materials, next) {

    object.traverse( function ( object ) {

      if ( object instanceof THREE.Mesh && object.material.name ) {

        let material = materials.create( object.material.name );

        if ( material ) {
          object.material = material;
        }
      }
    });

    next( null, object );
  }

  onProgress(msg) {

    return (e) => {

      log.debug('ModelLoader:', msg, parseInt(100 * e.loaded / e.total), '%' );
    }
  }
}

module.exports.loader = new ModelLoader();
