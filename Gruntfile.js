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
          base: '.',
          keepalive: true
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
          'lib/template.js'
        ]
      }
    }
  });


  grunt.registerTask('test', [
    'jasmine'
  ]);

  grunt.registerTask('develop', [
    'connect'
  ]);

};
