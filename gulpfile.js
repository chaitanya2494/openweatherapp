var gulp = require("gulp");

var concat = require('gulp-concat');
//const minify = require('gulp-minify');

// gulp.task('scripts', function () {
//     return gulp.src('./js/*.js')
//         .pipe(concat('app.js'))
//         .pipe(gulp.dest('./dist/'));
// });

gulp.task('scripts', function () {
    return gulp.src(['./js/constant.js', './js/app.js', './js/populate-weather-info.js',
        './js/remove-recent-search.js', './js/render-recent-search.js', './js/validation.js', './js/watch-input.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./prod/'));
});

gulp.task('libs', function () {
    return gulp.src(['./node_modules/moment/moment.js', './node_modules/lodash/lodash.min.js',
        './node_modules/jquery/dist/jquery.min.js', './node_modules/materialize-css/dist/js/materialize.min.js'])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('./prod/'));
});



// gulp.task('compress', function () {
//     gulp.src(['./js/constant.js', './js/app.js', './js/populate-weather-info.js',
//         './js/remove-recent-search.js', './js/render-recent-search.js', './js/validation.js', './js/watch-input.js'])
//         .pipe(minify())
//         .pipe(gulp.dest('dist'))
// });