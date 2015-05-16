var gulp = require('gulp');
var open = require('gulp-open');

gulp.task('open', function(){
  var options = {
    url: 'http://localhost:3000'
  };
  gulp.src('./dist/index.html')
  .pipe(open('', options));
});
