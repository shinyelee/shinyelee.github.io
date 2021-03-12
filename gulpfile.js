var gulp = require('gulp');

// gulp plugins and utils
var gutil = require('gulp-util');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');

// postcss plugins
var autoprefixer = require('autoprefixer');
var colorFunction = require('postcss-color-function');
var cssnano = require('cssnano');
var customProperties = require('postcss-custom-properties');
var easyimport = require('postcss-easy-import');

gulp.task('images', gulp.series(function(done) {
    return gulp.src('assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('assets/built/images/'))
        done();
}));

gulp.task('css', gulp.series(function(done) {
    var processors = [
        easyimport,
        customProperties,
        colorFunction(),
        autoprefixer({browsers: ['last 2 versions']}),
        cssnano()
    ];

    return gulp.src('assets/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/built/'))
        done();
}));

const postCssOptions = [
    assets({ loadPaths: ['images/'] }),
    autoprefixer(),
    postcssNormalize({
      browsers: 'last 2 versions',
      forceImport: true
    })
  ];