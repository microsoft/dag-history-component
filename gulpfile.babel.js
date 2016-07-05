import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('copy:sass', () => (
  gulp.src('src/**/*.sass')
      .pipe(gulp.dest('lib'))
));

gulp.task('babel', () => (
  gulp.src(['src/**/*.js', 'src/**/*.jsx'])
      .pipe(babel())
      .pipe(gulp.dest('lib'))
));

gulp.task('default', [
  'babel',
  'copy:sass',
]);
