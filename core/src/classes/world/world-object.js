'use strict';

let EventEmitter = require('events').EventEmitter;
let _ = require('lodash');
let assert = require('assert');

let log = require('../../log.js')('WorldObject');
let World = require('./world.js');

const positionDefaults = {
  x: 0,
  y: 0,
  xyAngle: 0,
  z: 0,
  zAngle: 0
};

class WorldObject extends EventEmitter {

  constructor(opts) {

    super();

    this.setPosition(opts);

    setTimeout( _.bind(this.runLifeCycle, this) );
  }

  setPosition(position) {

    _.assign(this, positionDefaults, _.pick(position, _.keys(positionDefaults)));
  }

  getPosition() {

    return _.pick(this, _.keys(positionDefaults));
  }

  static instanceClassName() {

    return /function\s+([^\s\(]+)[\s\(]/g.exec(this.toString())[1];
  }

  instanceClassName(){

    return this.instanceClass.instanceClassName();
  }

  static generateId() {

    this.nextId = (this.nextId || 1);

    return this.instanceClassName() + '-' + this.nextId++;
  }

  static create( id, ...opts ) {

    id = id || this.generateId();

    let instance = new this(...opts);
    instance.id = id;
    instance.instanceClass = this;

    log.debug("%s '%s' created", this.instanceClassName(), instance.id);

    return instance;
  }

  attach( world, position ) {

    assert.equal(world instanceof World, true, 'Not a World instance');

    if ( position ) {

      this.setPosition(position);
    }

    world.attach( this );

    return this;
  }

  runLifeCycle() {

  }

}

module.exports = WorldObject;
