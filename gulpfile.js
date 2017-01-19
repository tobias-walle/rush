let gulp = require('gulp');
let ts = require('gulp-typescript');
let nodemon = require('gulp-nodemon');
let webpack = require('gulp-webpack');
let tsProject = ts.createProject('tsconfig.json');
let shell = require('shelljs');


const IS_PRODUCTION = process.env.NODE_ENV === 'production';
console.log(process.env.NODE_ENV);

gulp.task('webpack', () => {
  let webpackConfigPath;
  if (IS_PRODUCTION) {
    webpackConfigPath = './webpack/webpack.config.production.js';
  } else {
    webpackConfigPath = './webpack/webpack.config.development.js';
  }
  return gulp.src('src/client/index.tsx')
    .pipe(webpack(require(webpackConfigPath)))
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

gulp.task('server', ['build'], () => {
  shell.exec(`NODE_ENV="${process.env.NODE_ENV}" node ./dist/server/index.js`);
});

gulp.task('nodemon', ['typescript'], () => {
  nodemon({
    script: 'dist/server/index.js',
    ext: 'js',
    env: { 'NODE_ENV': process.env.NODE_ENV}
  })
});

gulp.task('build', ['webpack', 'typescript']);

if (IS_PRODUCTION) {
  gulp.task('start', ['build', 'server']);
} else {
  gulp.task('start', ['typescript', 'watch', 'nodemon']);
}

gulp.task('default', ['build']);