'use strict';

let metrics = {
  meters: (value) => value / 10
}

function converter(value){ // meters

  return metrics.meters(value); // pixels
}

module.exports = converter;
