const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const gulp = require('gulp')
const less = require('gulp-less')
const pug = require('gulp-pug')
const pump = require('pump')
const uglifyjs = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const webserver = require('gulp-webserver')

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

gulp.task('default', ['less', 'js', 'views'])