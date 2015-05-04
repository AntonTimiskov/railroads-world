'use strict';

let util = require('util');
let _  = require('lodash');

function logger( moduleName ) {

  function _log(loglevel, ...args) {

    util.log( '['+loglevel+']', '['+moduleName+']', util.format.apply(util, args));
  }


  return {

    debug: _.bind(_log, null, 'debug'),
    info: _.bind(_log, null, 'info'),
    erro: _.bind(_log, null, 'error')
  };
};

module.exports = logger;
