const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const gulp = require('gulp')
const less = require('gulp-less')
const path = require('path')
const pug = require('gulp-pug')
const pump = require('pump')
const uglifycss = require('gulp-uglifycss')
const uglifyjs = require('gulp-uglify')
const webserver = require('gulp-webserver')

const vendors = path.join(__dirname, 'dist/vendors/')

gulp.task('vendors', function () {
  gulp.src('./node_modules/vue/dist/vue.min.js')
    .pipe(gulp.dest(vendors))

  gulp.src('./node_modules/tabletop/src/tabletop.min.js')
    .pipe(gulp.dest(vendors))
})

gulp.task('less', function () {
  return gulp.src('./src/less/*.less')
  .pipe(less())
  .pipe(autoprefixer())
  .pipe(uglifycss())
  .pipe(gulp.dest('./dist/assets/css'))
})

gulp.task('js', function (cb) {
  pump([
    gulp.src('./src/js/*.js'),
    babel(),
    uglifyjs(),
    gulp.dest('./dist/assets/js')
  ], cb)
})

gulp.task('views', function (cb) {
  pump([
    gulp.src('./src/views/*.pug'),
    pug(),
    gulp.dest('./dist')
  ], cb)
})

gulp.task('webserver', function () {
  gulp.src('./dist')
    .pipe(webserver({
      fallback: 'index.html',
      livereload: true,
      open: true,
      port: 8080
    }))
})

gulp.task('watch', function () {
  gulp.watch('./src/js/*.js', ['js'])
  gulp.watch('./src/less/**/*.less', ['less'])
  gulp.watch('./src/views/**/*.pug', ['views'])
})

gulp.task('development', ['webserver', 'watch'])

gulp.task('default', ['vendors', 'less', 'js', 'views'])