var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
    return browserify('./.tmp/index.js')
        .bundle()
        .pipe(source('room.js'))
        .pipe(gulp.dest('dist'));
});
