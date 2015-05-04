'use strict';

let _ = require('lodash');

function extandable(mod) {

  let extensions = [];

  function addExtension(extensionName, extensionModule, opts) {

    extensions.push({
      'name': extensionName,
      'module': extensionModule
    });
  }

  function listExtensions() {

    return _.map(extensions, (e)=> _.clone(e));
  }

  function loadExtensions() {

    let extList = listExtensions();
    _.each( extList, (ext) => {

      ext.module.apply(this);
    });
  }


  mod.addExtension = addExtension;
  mod.listExtensions = listExtensions;

  _.wrap(mod.prototype.constructor, (fn) => {

    fn();
    loadExtensions.apply(this);
  });

  return mod;
}

module.exports = extandable;
