'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

var deployConfig = 
{
         auth: {
            host: 'localhost',
            username : 'flocks',
            port: 22,
            password: 'Ff56725672.'
        },
        path : '/home'
}

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['app/**/*.js'],
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
        tasks: ['hj;cl: ', 'concat','uglify','livereload']
      },
      css: {
        files: '**/*.scss',
         tasks: ['sass',,'livereload'],
         events: true
       }
    },

  s3: {
    options: {
      key: 'AKIAINEWILJ33O57FLLQ',
      secret: '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',
      bucket: 'cornelien2',
      access: 'public-read',
      region: 'eu-west-1'
    },
    dev: {
      // These options override the defaults
      options: {
        encodePaths: true,
        maxOperations: 20
      },
      // Files to be uploaded.
      upload: [
        {
          src: 'dist/cornelien.min.js',
          dest: 'dist/cornelien.min.js',
          gzip: true
        },
        {
          src: 'index.html',
          dest: 'index.html',
        },
        
      ]

    }

  }
  });



  grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');


  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('server', ['livereload-start', 'connect', 'regarde']);
  grunt.registerTask('build', ['concat', 'uglify']);

};