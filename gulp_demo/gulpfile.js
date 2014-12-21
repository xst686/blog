var gulp = require('gulp');  

var compass = require( 'gulp-compass' );

var browserSync = require("browser-sync");

var reload  = browserSync.reload;

gulp.task('compass', function() {
  gulp.src('./sass/*.scss').pipe(compass({
      config_file: './config.rb',
      css: 'css',
      sass: 'sass'
    })).pipe(reload({stream:true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('normal', function() {
  gulp.src(['./*.html']).pipe(reload({stream:true}));
});

// 在命令行中运行 gulp，默认执行 default，你也可以自定义其他命令
gulp.task('default', ['compass', 'browser-sync','normal'], function () {
	gulp.watch(['./sass/{,*/}*.scss'], ['compass']);
	gulp.watch(['./*.html','./css/{,*/}*.css','./js/{,*/}*.js','./images/{,*/}*.{png,jpg}'],['normal']);
});