module.exports = function(grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        eqeqeq: true,
        eqnull: true,
        browser: true,
        strict: true,
        undef: true,
        unused: true,
        forin: true,
        freeze: true,
        latedef: true,
        noarg: true,
        nocomma: true,
        nonbsp: true,
        nonew: true,
        notypeof: true,
        jasmine: true,
        jquery: true,
        globals: {
          module: false, require: false, // for Gruntfile.js
          exports: false, // for protractor.conf.js
          inject: false, // testing angular
          angular: false,
          console: false,
          browser: false, element: false, by: false, // Protractor
        },
      },
      all: ['Gruntfile.js', 'src/**/*.js', 'languages/*.js']
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/lib/dragAndDropListeners.js', 'src/gameLogic.js', 'src/game.js'],
        dest: 'dist/everything.js',
      },
    },
    uglify: {
      options: {
        sourceMap: true,
      },
      my_target: {
        files: {
          'dist/everything.min.js': ['dist/everything.js']
        }
      }
    },
    processhtml: {
      dist: {
        files: {
          'game.min.html': ['game.html']
        }
      }
    },
    manifest: {
      generate: {
        options: {
          basePath: '.',
          cache: [
            'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js',
            'http://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min.js',
            'http://yoav-zibin.github.io/emulator/dist/gameServices.min.js',
            'http://yoav-zibin.github.io/emulator/angular-translate/angular-translate.2.6.1.min.js',
            'languages/en.js',
            'http://yoav-zibin.github.io/emulator/main.css',
            'dist/everything.min.js',
            'styles/main.css',
          ],
          network: [
            'languages/de.js',
            'dist/everything.min.js.map',
            'dist/everything.js'
          ],
          timestamp: true
        },
        dest: 'game.appcache',
        src: []
      }
    },
  });

  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('default', ['jshint',
      'concat', 'uglify',
      'processhtml', 'manifest']);

};