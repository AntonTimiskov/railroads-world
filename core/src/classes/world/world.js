'use strict';

let EventEmitter = require('events').EventEmitter;
let _ = require('lodash');

let log = require('../../log.js')('World');

class World extends EventEmitter {

  constructor() {

    super();

    log.info('World created');

    setTimeout( _.bind(this.runLifeCycle, this) );
  }

  runLifeCycle() {


  }

  attach( worldObject ) {

    let o = worldObject;
    log.debug("%s '%s' attached to world at position %j",
              o.instanceClassName(), o.id, o.getPosition());
  }

}

module.exports = World;
