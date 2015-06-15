// based on https://github.com/BrowserSync/recipes/tree/master/recipes/gulp.browserify
var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var gutil = require('gulp-util');
var reload = browserSync.reload;
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var nodemon = require('gulp-nodemon');
var babelify = require("babelify");
var awspublish = require('gulp-awspublish');
 
gulp.task('publish', ['bundle'], function() {
 
  var publisher = awspublish.create({ 
    bucket: 'repowering-widget', 
    accessKeyId: process.env.RACCESSKEYID,
    secretAccessKey: process.env.RSECRETACCESSKEY,
    region: "eu-west-1"
  });
 
  var headers = {
   };

  return gulp.src('./app/**/*.*')
    // .pipe(awspublish.gzip({ ext: '.gz' }))
    .pipe(publisher.publish(headers)) 
    .pipe(publisher.cache()) 
    .pipe(awspublish.reporter());
});

var bundler = watchify(browserify('./app/scripts/app.js', watchify.args).transform(babelify));
bundler.on('update', bundle);

function bundle() {
  gutil.log('Compiling JS...');

  bundler
    .bundle()
    .on('error', function (err) {
        browserSync.notify("Browserify Error!");
        this.emit("end");
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./app/scripts/dist'))
    .pipe(reload({stream: true, once: true}));
}


gulp.task('bundle', function () {
    return bundle();
});

gulp.task('js-watch', ['bundle'], reload);

gulp.task('jsonp-test-server', function () {
  nodemon({
    script: 'server.js'
  , ext: 'js'
  , env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('widget-server', ['bundle'], function () {
  browserSync({
      port: 9999,
      server: {
          baseDir: "app"
      }
  });

  gulp.watch(['*.html', "*.json"], {cwd: 'app'}, reload);
});

gulp.task('default', ['widget-server', 'jsonp-test-server'], function() {
});