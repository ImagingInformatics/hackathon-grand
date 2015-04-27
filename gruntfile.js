module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            default: {
                src: [
                    '../build'
                ]
            }
        },
        copy: {
            bowercss: {
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.min.css',
                    'bower_components/cornerstone/dist/cornerstone.css',
                ],
                dest: '../build/bower/css',
                expand: true,
                flatten: true
            },
            bowerjs: {
                src: [
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/cornerstone/dist/cornerstone.js',
                    'bower_components/cornerstoneMath/dist/cornerstoneMath.js',
                    'bower_components/cornerstoneTools/dist/cornerstoneTools.js',
                    'bower_components/cornerstoneWADOImageLoader/dist/cornerstoneWADOImageLoader.js',
                    'bower_components/cornerstoneWebImageLoader/dist/cornerstoneWebImageLoader.js',
                    'bower_components/dicomParser/dist/dicomParser.js',
                    // hammerjs?
                    'bower_components/image-jpeg2000/dist/jpx.js',
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/jquery/dist/jquery.min.map',
                ],
                dest: '../build/bower/js',
                expand: true,
                flatten: true
            },
            bowerfonts: {
                src: [
                    'bower_components/bootstrap/dist/fonts/*',
                ],
                dest: '../build/bower/fonts',
                expand: true,
                flatten: true
            },
            srchtml: {
                src: [
                    'src/html/*',
                ],
                dest: '../build/',
                expand: true,
                flatten: true
            }


        },
        watch: {
            scripts: {
                files: ['src/html/*', 'test/**/*.js'],
                tasks: ['buildAll']
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('buildAll', ['copy']);
    grunt.registerTask('default', ['clean', 'buildAll']);
};


// Release process:
//  1) Update version numbers in package.json and bower.json
//  2) do a build (needed to update dist versions with correct build number)
//  3) commit changes
//      git commit -am "Changes...."
//  4) tag the commit
//      git tag -a 0.1.0 -m "Version 0.1.0"
//  5) push to github
//      git push origin master --tags