module.exports = function (grunt) {
  'use strict';

  // Load grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.config('pkg', grunt.file.readJSON('package.json'));
  grunt.initConfig({
    // Static Webserver
    connect: {
      server: {
        options: {
          port: 9001,
          base: '.'
        }
      }
    },

    jasmine: {
      src: [
        'lib/helpers.js',
        'lib/request.js',
        'lib/app.js'
      ],
      options: {
        specs: 'spec/*.js',
        vendor: [
          'vendor/template.js'
        ]
      }
    },

    watch: {
      js: {
        files: [
          'lib/*.js',
          'spec/*.js',
        ],
        tasks: [
          'jshint',
          'jasmine'
        ]
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'lib/*.js',
        'spec/*.js'
      ]
    }
  });


  grunt.registerTask('test', [
    'jasmine'
  ]);

  grunt.registerTask('develop', [
    'jshint',
    'jasmine',
    'connect',
    'watch',
  ]);

};
