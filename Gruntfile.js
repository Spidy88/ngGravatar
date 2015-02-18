
module.exports = function(grunt) {

    grunt.registerTask( 'default', [ 'clean', 'browserify' ] );

    grunt.initConfig({
        browserify: {
            dist: {
                files: {
                    './dist/app.js': [ './lib/index.js' ]
                }
            }
        },

        watch: {
            dist: {
                files: [ './lib/**/*.js' ],
                tasks: [ 'default' ]
            }
        },

        clean: ['./dist']
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
};