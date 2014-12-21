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
