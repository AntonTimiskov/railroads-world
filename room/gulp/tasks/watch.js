var gulp     = require('gulp');

gulp.task('watch', function() {
  gulp.watch('src/*.less',   ['less']);
  gulp.watch('src/*.js', ['babel', 'browserify']);
  gulp.watch('src/*.html', ['copy-html']);
  gulp.watch('../assets/*', ['copy-models']);
});
