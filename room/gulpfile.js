var requireDir = require('require-dir');
var gulp = require('gulp');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });

gulp.task('build', ['copy-html', 'copy-models', 'babel', 'browserify', 'less']);
gulp.task('default', ['build', 'watch', 'serve', 'open']);
