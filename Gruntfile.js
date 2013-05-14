'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['app/app.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    sass: {
       dist: {
         files: {
          'app/styles/main.css': 'app/styles/main.scss'
         }
       }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
   
    jshint: {
      files: ['app/app.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    livereload: {
      port: 35729 // Default livereload listening port.
    },
    connect: {
      livereload: {
        options: {
          port: 9001,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)]
          }
        }
      }
    },
    // Configuration to be run (and then tested)
    regarde: {
      js: {
        files: ['app/models/*.js', 'app/app.js', 'app/views/*.js', 'app/collections/*.js'],
        tasks: ['jshint', 'concat','uglify','livereload']
      },
      css: {
        files: '**/*.scss',
         tasks: ['sass',,'livereload'],
         events: true
       }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');



  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('server', ['livereload-start', 'connect', 'regarde']);

};