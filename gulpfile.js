'use strict';

// create this file with {"key" : "YOUR-TEAMWORK-API-KEY"}.
// set YOUR-KEY = null to run w/out a key
var TW_KEY = {'key' : null};
var key_file = './TW-API-KEY.json'
var fs = require('fs');
if( fs.existsSync(key_file) ) {
  TW_KEY = require(key_file);
}

console.log("Using TW_KEY = ", TW_KEY);

//console.log("process.env", process.env);
var gulp = require('gulp'),
    changed = require('gulp-changed'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    reload = browserSync.reload,
    p = {
      jsx: ['./scripts/app.jsx'],
      bookmarklet: 'scripts/bookmarklet.js',
      assets: ['./img/**/*'],
      scss:   'styles/**/*.scss',
      bundle: 'app.js',
      dist:   'dist',
      distJs: 'dist/js',
      distCss: 'dist/css'
    };

var key_file = function(filePath){
  var TW_KEY = {'key' : null};
  var fs = require('fs');

  if( fs.existsSync(filePath) ) {
    TW_KEY = require(filePath);
  }
  return TW_KEY;
};

gulp.task('clean', function(cb) {
  del(['dist'], cb);
});

gulp.task('browserSync', function() {
  var path = '/dist/';
  path = ( TW_KEY && TW_KEY.key ) ? '/dist/?key=' + TW_KEY.key : path;
  browserSync({
    server: {
      baseDir: './'
    },
    startPath : path
  });
});

gulp.task('watchify', function() {
console.log(watchify);

  var bundler = watchify(browserify(p.jsx, watchify.args));

  function rebundle() {
    return bundler
      .bundle()
      .on('error', notify.onError())
      .pipe(source(p.bundle))
      .pipe(gulp.dest(p.distJs))
      .pipe(reload({stream: true}));
  }

  bundler.transform(babelify)
  .on('update', rebundle);
  return rebundle();
});

gulp.task('bookmarklet', function() {
  gulp.src(p.bookmarklet)
    .pipe(gulp.dest(p.distJs))
});

gulp.task('assets', function() {
  gulp.src([p.assets])
    .pipe(gulp.dest(p.dist))
});

gulp.task('copyImg', function () {
  return gulp.src(['./img/**/*'], {
      base: 'img'
  }).pipe(gulp.dest('dist/img'));
});

gulp.task('copyHtml', function () {
  return gulp.src(['index.html'], {
      base: '.'
  }).pipe(gulp.dest(p.dist));
});


gulp.task('browserify', function() {
  browserify(p.jsx)
    .transform(babelify)
    .bundle()
    .pipe(source(p.bundle))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(p.distJs));
});

gulp.task('styles', function() {
  return gulp.src([p.scss])
    .pipe(changed(p.distCss))
    .pipe(sass({errLogToConsole: true}))
    .on('error', notify.onError())
    .pipe(autoprefixer('last 1 version'))
    //.pipe(csso())
    .pipe(gulp.dest(p.distCss))
    .pipe(reload({stream: true}));
});

gulp.task('watchTask', function() {
  gulp.watch(p.scss, ['styles']);
  gulp.watch(p.bookmarklet, ['bookmarklet']);
  gulp.watch(p.assets, ['copyImg']);
  gulp.watch('index.html', ['copyHtml']);
});


gulp.task('watch', ['clean'], function() {
  gulp.start(['browserSync', 'watchTask', 'watchify', 'styles','copyImg','copyHtml','bookmarklet']);
});

gulp.task('build', ['clean'], function() {
  process.env.NODE_ENV = 'production';
  gulp.start(['browserify', 'styles','copyImg','copyHtml','bookmarklet']);
});

gulp.task('default', function() {
  console.log('Run "gulp watch or gulp build"');
});
