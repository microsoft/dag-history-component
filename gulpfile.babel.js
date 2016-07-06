import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import sass from 'gulp-sass';
import sassLint from 'gulp-sass-lint';
import gutil from 'gulp-util';

const paths = {
  js: ['src/**/*.js', 'src/**/*.jsx'],
  sass: 'src/**/*.sass',
  sassRoot: 'src/daghistory.sass',
};
const DEST = 'lib';

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

gulp.task('sass', () => (
  gulp.src(paths.sassRoot)
      .pipe(sass())
      .pipe(gulp.dest(DEST))
));

gulp.task('lint', ['lint:js', 'lint:sass']);

gulp.task('babel', () => (
  gulp.src(paths.js)
      .pipe(babel())
      .pipe(gulp.dest(DEST))
));

gulp.task('watch', ['default'], () => {
  gulp.watch(paths.js, ['lint:js', 'babel']).on('error', gutil.log);
  gulp.watch(paths.sass, ['lint:sass', 'sass']).on('error', gutil.log);
});

gulp.task('default', [
  'babel',
  'lint',
  'sass',
]);
