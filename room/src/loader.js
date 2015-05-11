(function(){

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
  loader.setAttribute('style', styles({
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-5px 0 0 -100px',
    width: '200px',
    height: '10px',
    border: '1px solid '+color
  }));

  var progress = document.createElement('div');
  loader.appendChild(progress);

  var p;
  window.Progress = p = {

      setProgress: function(val){

        progress.setAttribute('style', styles({
          'background-color': color,
          width: val*2 + 'px',
          height: '10px'
        }));

        var pScript = document.getElementById('p'+val);
        if ( pScript ) {

          pScript.remove();
        }

        if ( val >= 100 ) {

          delete window.Progress;
          progress.remove();
          loader.remove();
        }
      }
  };

  p.setProgress(1);

  /*window.onload = function() {
    p.setProgress(100);
  };*/

  document.body.appendChild(loader);
}).call();
