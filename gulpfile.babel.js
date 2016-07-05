import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import sassLint from 'gulp-sass-lint';
import gutil from 'gulp-util';

const paths = {
  js: ['src/**/*.js', 'src/**/*.jsx'],
  sass: 'src/**/*.sass',
};

gulp.task('lint:js', () => (
  gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
));

gulp.task('lint:sass', () => (
  gulp.src(paths.sass)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
));

gulp.task('lint', ['lint:js', 'lint:sass']);

gulp.task('copy:sass', () => (
  gulp.src(paths.sass)
      .pipe(gulp.dest('lib'))
));

gulp.task('babel', () => (
  gulp.src(paths.js)
      .pipe(babel())
      .pipe(gulp.dest('lib'))
));

gulp.task('watch', ['default'], () => {
  gulp.watch(paths.js, ['lint:js', 'babel'])
      .on('error', gutil.log);
  gulp.watch(paths.sass, ['lint:sass', 'copy:sass'])
      .on('error', gutil.log);
});

gulp.task('default', [
  'babel',
  'lint',
  'copy:sass',
]);
