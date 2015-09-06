 var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    sync = require('nobone-sync/client');

var paths = {
    css: 'static/css/**/*.styl'
};

gulp.task('build:css', function() {
    gulp.src(paths.css)
        .pipe(stylus())
        .pipe(gulp.dest('static/css'))
});

gulp.task('sync', function() {
    var conf = {
        localDir: '.',
        remoteDir: '/alidata/www/wordpress/wp-content/themes/car',
        host: '182.92.183.34',
        port: 8345
    };
    sync(conf);
});

gulp.task('watch', ['sync'], function() {
    gulp.watch(paths.css, ['build:css'])
});