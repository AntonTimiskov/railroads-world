'use strict';

let assert = require('assert');
let _ = require('lodash');

let WorldObject = require('../world/world-object.js');
let Rail = require('../rail/rail.js');
let log = require('../../log.js')('Train');

class Train extends WorldObject {

  constructor(opts) {

    super(opts);

    this.direction = null;
  }

  putOnRail( rail, railSide='center', trainDirection=directions.left2right ) {

    assert.equal( rail instanceof Rail, true, 'Not a rail instance');

    this.rail = rail;

    const railSides = {
      'left': _.bind(rail.getLeftSidePositionOnRail, rail),
      'right': _.bind(rail.getRightSidePositionOnRail, rail),
      'center': _.bind(rail.getPosition, rail)
    };

    this.setPosition( railSides[railSide]() );

    this.direction = trainDirection;

    return this;
  }

}

const directions = {
  'left2right': 'left2right',
  'right2left': 'right2left'
};

Train.Directions = directions;

require('../../extandable-module.js')(Train);

module.exports = Train;
