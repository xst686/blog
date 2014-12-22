Grunt VS Gulp
=============
前言
-------------
  2014年12月20日下午，参加fequan的走进名企之YY前端技术分享专场，刘剑辛&刘达慰分享了【基于Gulp的前端自动化】，其实gulp早有耳闻，只是当初一开始就选择grunt，感觉这种自动化工具够用就行，所以也没去试用gulp，在茶歇的时候，跟剑辛童鞋交流了一下grunt和gulp的优缺点之后，回来立马投入gulp的研究，并与grunt做了一些对比,如有错误之处,欢迎指正。
  
前期准备
-------------
*   windows7
*   node 
*   ruby 
*   sass+compass

grunt篇
-------------
新建一个grunt_demo 目录，用compass 创建一个项目
```shell
  mkdir grunt_demo
  cd grunt_demo
  compass init
```
![stepOne](http://img.quan.mx/54982516a20a4251.gif)
打开CMD，安装grunt-cli到全局环境
```
npm install -g grunt-cli
```
![stepTwo](http://img.quan.mx/5498279266f65587.gif)

> 注意，安装grunt-cli并不等于安装了 Grunt！Grunt CLI的任务很简单：调用与Gruntfile在同一目录中
> Grunt。这样带来的好处是，允许你在同一个系统上同时安装多个版本的 Grunt。

在根目录下新建一份Gruntfile.js和package.json
接着安装grunt和grunt插件，这个demo主要目标是做一个编译compass并自动刷新浏览器的demo，需要用到组件 :

 - grunt
 - grunt-contrib-compass 
 - grunt-contrib-watch
 - grunt-browser-sync

 安装命令：
```shell
npm install grunt grunt-contrib-compass grunt-contrib-watch grunt-browser-sync --save-dev
```
![stepThree](http://img.quan.mx/5498279fb7689889.gif)
安装好之后的package.json是这样的：
```json
{
  "name": "grunt_demo",
  "version": "1.0.0",
  "description": "grunt demo",
  "main": "index.html",
  "repository": {
    "type": "git",
    "url": "https://github.com/Janking/blog"
  },
  "author": "Janking",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Janking/blog/issues"
  },
  "homepage": "https://github.com/Janking/blog",
  "devDependencies": {
    "grunt": "^0.4.5",
    "grunt-browser-sync": "^1.5.3",
    "grunt-contrib-compass": "^1.0.1",
    "grunt-contrib-watch": "^0.6.1"
  }
}

```
接着就是关键的Gruntfile.js文件
```js
module.exports = function(grunt) {
    // 1. 所有的配置将在这里进行
    grunt.initConfig({
            compass: {
                dist: {
                    options: {
                        config: 'config.rb'
                    }
                }
            },
            watch: {
                compass: {
                    files: 'sass/{,*/}*.scss',
                    tasks: ["compass:dist"]
                }
            },
            browserSync: {
                dev: {
                    bsFiles: {
                        src: ['stylesheets/{,*/}*.css','*.html','js/{,*/}*.js'] //监听改变的文件，可以是js，html，css等等
                    },
                    options: {
                        watchTask: true, // < VERY important
                        server:{
                          baseDir: "./"
                        }
                    }
                }
            }
        })
        // 2. 我们在这里告诉grunt我们将使用插件
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    // 3. 执行
    grunt.registerTask('default', ["browserSync", "watch"]); //当在命令行中敲入 grunt，默认执行default

    //你还可以自定义命令，如
    //grunt.registerTask('compass', ["compass"]); 
    //命令行： grunt compass
}


```

详细的Gruntfile配置教程可以参考这里：http://www.gruntjs.net/

> grunt的工作流程：读文件、修改文件、写文件、读文件、修改文件、写文件.....如果compass还要合并雪碧图的话，grunt的耗时就更长了，我试过最长需要2s，接下来我们试试gulp！

gulp篇
-------------
新建一个gulp_demo 目录，用compass 创建一个项目

```shell
  mkdir gulp_demo
  cd gulp_demo
  compass init
```
打开CMD，安装gulp到全局环境
```shell
npm install gulp -g
```
创建package.json ,命令行中输入npm init,按照提示敲完即可
再将gulp和需要用到的组件安装在本地项目中
```shell
npm install gulp-compass browser-sync --save-dev 
```
安装完毕，package.json文件如下所示：
```json
{
  "name": "gulp_demo",
  "version": "1.0.0",
  "description": "gulp demo",
  "main": "index.html",
  "repository": {
    "type": "git",
    "url": "https://github.com/Janking/blog"
  },
  "author": "Janking",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Janking/blog/issues"
  },
  "homepage": "https://github.com/Janking/blog",
  "devDependencies": {
    "browser-sync": "^1.8.1",
    "gulp-compass": "^2.0.3"
  }
}


```
> gulp所需要的组件比grunt要少一个 :）

然后在根目录上新建gulpfile.js文件，配置如下：
```js
var gulp = require('gulp');  

var compass = require( 'gulp-compass' );

var browserSync = require("browser-sync");

var reload  = browserSync.reload;

gulp.task('compass', function() {
  gulp.src('sass/*.scss').pipe(compass({
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
  gulp.src(['*.html']).pipe(reload({stream:true}));
});

// 在命令行中运行 gulp，默认执行 default，你也可以自定义其他命令
gulp.task('default', ['compass', 'browser-sync','normal'], function () {
  gulp.watch(['./sass/{,*/}*.scss'], ['compass']);
  gulp.watch(['./*.html','./css/{,*/}*.css','./js/{,*/}*.js','./images/{,*/}*.{png,jpg}'],['normal']);
});
```
> gulp的工作流程：文件流--文件流--文件流......因为grunt操作会创建临时文件，会有频繁的IO操作，而gulp使用的是流操作，一直是在内存中处理，直到输出结果。 因此gulp在效率上确实远胜grunt，并且学习成本不高，在这非常感谢刘剑辛的分享！

### 顺便做个推广：首届前端开发者年度大会 2015-01-17 广州华南农业大学举办，有兴趣的童鞋快来看看http://www.fequan.com/feday

demo：https://github.com/Janking/blog
如果要运行demo，先执行下面这些命令
```shell
npm install
#如果你未安装grunt-cli或gulp，请先全局安装#
npm install -g grunt-cli
npm install -g gulp

```
