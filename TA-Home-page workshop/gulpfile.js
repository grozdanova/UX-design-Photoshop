var gulp = require('gulp');


gulp.task("copy:html", () => {
    return gulp.src(["./**/*.html", "!node_modules/**"])
        .pipe(gulp.dest("build"));
});

//Lint
const csslint = require('css-lint'),
eslint = require("gulp-eslint"),
sassLint = require('gulp-sass-lint');
 
gulp.task('lint:css', function() {
  gulp.src(['styles/**/*.css', "!node_modules/**"])
    .pipe(csslint())
    .pipe(csslint.formatter())
    .pipe(csslint.report());
            
});
gulp.task("lint:js", () => {
    return gulp.src(["scripts/**/*.js", "!node_modules/**"])
        .pipe(eslint({configFile: 'eslintrc.json'}))
        // .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("lint:sass", () => {
    return gulp.src(["scss/**/*.s+(a|c)ss", "!node_modules/**"])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});
//gulp.task("lint", ["lint:css", "lint:js", "lint:sass"]);

//Sass
var sass = require('gulp-sass');
gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(gulp.dest('styles'))
})

//Minify css
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
 
gulp.task('mincss', function () {
    gulp.src('styles/**/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('styles'));
});

gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', ['sass']);
});
gulp.task('default', ['watch']);