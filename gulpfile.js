var gulp = require('gulp');
var serve = require('gulp-serve');
 
gulp.task('serve', serve('public'));
gulp.task('serve-build', serve(['public', 'build']));
gulp.task('serve-prod', serve({
  root: ['public', 'build'],
  port: 80,
  middleware: function(req, res) {
    // custom optional middleware 
  }
}));


gulp.task('default', function() {
  // place code for your default task here
  console.log("hekki")
});

gulp.task('test', function() {
	//live-server;
});