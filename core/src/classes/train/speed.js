'use strict';

let log = require('../../log.js')('TrainSpeedExtension');
let Train = require('./train.js');

function TrainSpeedExtension(){

  this.speed = 0;
  
  log.debug('intialized');
}

Train.addExtension('Speed', TrainSpeedExtension);

module.exports = TrainSpeedExtension;
