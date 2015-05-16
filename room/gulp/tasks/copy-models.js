var gulp = require('gulp');

gulp.task('copy-models', function () {
  return gulp.src(['../assets/**/*'])
        .pipe(gulp.dest('dist'));
});
