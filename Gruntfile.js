module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      files: ['public/**/*'],
      tasks: ['less:dev'],
      options: {
        spawn: false
      }
    },

    less: {
      dev: {
        options: {
          sourceMap: true,
          sourceMapURL: 'main.css.map'
        },
        files: {
          'public/stylesheets/main.css': 'public/less/main.less'
        }
      }
    },

    notify: {
      'notify_hooks': {
        options: {
          enabled: true,
          title: '<%= pkg.name %>: Grunt Notifier',
          message: 'Grunt running'
        }
      },
      less: {
        options: {
          title: '<%= pkg.name %>: Converting LESS',
          message: 'LESS complete'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.task.run('notify_hooks');

  grunt.registerTask('default', [
    'less:dev',
    'notify',
    'watch'
  ]);

};