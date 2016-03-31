var gulp = require("gulp");
var babel = require("gulp-babel");
var livereload = require('gulp-livereload');
var runSeq = require('run-sequence');



gulp.task('build', function () {
    return gulp.src("src/board-state/main.js")
    .pipe(babel())
    .pipe(gulp.dest("build"));
});

gulp.task('reload', function () {
    livereload.reload();
});

gulp.task('default', function () {

    livereload.listen();
    gulp.start('build');

    gulp.watch('src/board-state/**', function () {
        runSeq('build', 'reload');
    });

});