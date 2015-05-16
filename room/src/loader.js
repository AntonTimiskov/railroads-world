function styles(obj) {
  var s = '';
  for (name in obj){
    s = s + name + ':' + obj[name] + ';';
  }
  return s;
}

var color = '#337ab7';

var loader = document.createElement('div');
loader.id = 'loader';
var loaderStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  margin: '-5px 0 0 -100px',
  width: '200px',
  height: '10px',
  border: '1px solid '+color
};
loader.setAttribute('style', styles(loaderStyles));

var progress = document.createElement('div');
loader.appendChild(progress);

var p = {

    setProgress: function(val){

      loader.setAttribute('style', styles(loaderStyles));

      progress.setAttribute('style', styles({
        'background-color': color,
        width: val*2 + 'px',
        height: '10px'
      }));

      if ( val >= 100 ) {
        loader.setAttribute('style', styles({
          display: 'none'
        }));
      }
    }
};

document.body.appendChild(loader);

module.exports = p;
