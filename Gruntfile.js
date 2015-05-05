'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        clean: {
            css: ['css']
        },

        sass: {
            options: {
                sourceMap: false, //no source maps b/c web-components inline css anyway...

                 /*
                  See https://github.sw.ge.com/pxc/px-getting-started#a-note-about-relative-import-paths for an explanation
                  of the contents of the includePaths option for Sass
                 */
                includePaths: ['bower_components/*']
            },
            dist: {
                files: {
                    'css/noprefix/px-app.css': 'sass/px-page-theme.scss'                }
            }
        },

        autoprefixer: {
          options: {
            browsers: ['last 2 version']
          },
          multiple_files: {
            expand: true,
            flatten: true,
            src: 'css/noprefix/*.css',
            dest: 'css'
          }
        },

        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            bower: {
                command: 'bower install'
            }
        },

        jshint: {
            all: [
                'Gruntfile.js',
                'js/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        watch: {
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['sass'],
                options: {
                    interrupt: true
                }
            }
        },

        depserve: {
            options: {
                open: '<%= depserveOpenUrl %>'
            }
        },

        insert: {
          insertcomponentcss:{
            src: "css/px-theme.css",
            dest: "px-theme.html",
            match: "!!css goes here!!"
          },
          insertappcss:{
            src: "css/px-app.css",
            dest: "px-app.html",
            match: "!!css goes here!!"
          }
        },

        copy: {
          copycomponenttemplate: {
            src: "_px-theme.html",
            dest: "px-theme.html"
          },
          copyapptemplate: {
            src: "_px-app.html",
            dest: "px-app.html"
          }


        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-dep-serve');
    grunt.loadNpmTasks('grunt-insert');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Default task.
    grunt.registerTask('default', 'Basic build', [
      'clean',
      'sass',
      'autoprefixer',
      'copy',
      'insert'
    ]);

};
