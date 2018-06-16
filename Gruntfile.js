//Task Runner
module.exports = function (grunt) {
    grunt.initConfig({
        mochaTest: {
            test: {
                src: ['tests/**/**.spec.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.registerTask('test', 'mochaTest');
};