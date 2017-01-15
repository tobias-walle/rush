let gulp = require('gulp');
let ts = require('gulp-typescript');
let nodemon = require('gulp-nodemon');
let tsProject = ts.createProject('tsconfig.json');

gulp.task('typescript', () => {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist/server'));
});

gulp.task('watch', ['typescript'], () => {
  gulp.watch('src/server/*.ts', ['typescript']);
});

gulp.task('start', ['typescript'], () => {
  nodemon({
    script: 'dist/server/index.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development'}
  })
});

gulp.task('default', ['typescript', 'watch', 'start']);