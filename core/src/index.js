'use strict';

var rrw = {};

rrw.log = require('./log.js')('Program');

rrw.classes = {};

rrw.classes.Train = require('./classes/train/train.js');
rrw.classes.Rail = require('./classes/rail/rail.js');
rrw.classes.World = require('./classes/world/world.js');

rrw.world = new rrw.classes.World();

let Rail = rrw.classes.Rail;

let rail = rrw.classes.Rail
            .create()
            .attach(rrw.world, { x:0, y: 0 });

let Train = rrw.classes.Train;

let train = rrw.classes.Train
            .create('RedArrow', {})
            .attach(rrw.world)
            .putOnRail( rail, 'left', Train.Directions.left2right )
            //.accelerate('forward');

rrw.log.debug( train.getPosition() );

exports = rrw;
