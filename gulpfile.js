let gulp = require('gulp');
let ts = require('gulp-typescript');
let nodemon = require('gulp-nodemon');
let webpack = require('gulp-webpack');
let tsProject = ts.createProject('tsconfig.json');

gulp.task('webpack', () => {
  return gulp.src('src/client/index.tsx')
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('typescript', () => {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist/server'));
});

gulp.task('watch', ['typescript'], () => {
  gulp.watch('src/server/*.ts', ['typescript']);
});

gulp.task('nodemon', ['typescript'], () => {
  nodemon({
    script: 'dist/server/index.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development'}
  })
});

gulp.task('build', ['webpack', 'typescript']);

gulp.task('start', ['typescript', 'watch', 'nodemon']);

gulp.task('default', ['build']);