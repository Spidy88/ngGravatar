module.exports = function(grunt) {
    grunt.registerTask('default', [
        'clean',
        'build',
        'copy'
    ]);
    grunt.registerTask('build', [
        'browserify',
        'uglify'
    ]);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            dist: {
                files: {
                    './dist/ng-gravatar.js': ['./src/index.js']
                }
            }
        },

        uglify: {
            dist: {
                options: {
                    report: 'gzip',
                    sourceMap: true
                },
                files: {
                    './dist/ng-gravatar.min.js': ['./dist/ng-gravatar.js']
                }
            }
        },

        copy: {
            md5: {
                files: {
                    './dist/md5.js': './bower_components/blueimp-md5/js/md5.js',
                    './dist/md5.min.js': './bower_components/blueimp-md5/js/md5.min.js'
                }
            }
        },

        watch: {
            dist: {
                files: ['./src/**/*.js'],
                tasks: ['build']
            }
        },

        clean: ['./dist']
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
};