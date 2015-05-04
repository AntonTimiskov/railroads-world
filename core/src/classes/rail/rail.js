'use strict';

let assert = require('assert');

let WorldObject = require('../world/world-object.js');
let converter = require('../world/converter.js');
let log = require('../../log.js')('Rail');

class Rail extends WorldObject {

  constructor(opts) {

    super(opts);

    this.length = converter( 50 ); // meters
  }

  getPositionOnRail( value ) {

    assert.ok( value <= this.length && value >= 0,
               'Position value have to fit to the rail length' );

    let center = this.getPosition();
    let len = this.length;

    return {
      x: center.x +  ( (value-(len/2)) * Math.sin(center.xyAngle) ),
      y: center.y +  ( (value-(len/2)) * Math.cos(center.xyAngle) ),
      z: center.z,
      xyangle: center.xyAngle,
      zangle: center.zAngle
    };
  }

  getLeftSidePositionOnRail() {

    return this.getPositionOnRail( 0 );
  }

  getRightSidePositionOnRail() {

    return this.getPositionOnRail( this.length );
  }

}

require('../../extandable-module.js')(Rail);

module.exports = Rail;
