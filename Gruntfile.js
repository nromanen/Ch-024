module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: 'localhost',
                    base: '.',
                    keepalive: true
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    name: 'Routes/Route',
                    baseUrl: 'public/js',
                    mainConfigFile: 'public/js/config.js',
                    findNestedDependencies: true,
                    include: 'Vendor/require.js',
                    out: 'public/build/project.js'
                }
            }
        },
        imagemin: {
            static: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }]
                },
                files: {
                    'dist/img.png': 'src/img.png',
                    'dist/img.jpg': 'src/img.jpg',
                    'dist/img.gif': 'src/img.gif'
                }
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'public/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'public/build/images'
                }]
            }
        },
        uglify: {
            options: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        compilejs: {
            files: {
                'public/build/<%= pkg.name %>.min.js': ['public/build/project.js']
                }
            }
        },
        clean: {
            js: ['public/build/project.js']
        },
        cssmin: {
            compilecss: {
                options: {
                banner: '/* <%= pkg.name %> */'
            },
                files: {
                    'public/build/<%= pkg.name %>.min.css': ['public/**/*.css']
                }
            }
        },
        copy: {
            fonts: {
                expand: true,
                cwd: 'public/css/fonts',
                src: '**',
                dest: 'public/build/fonts',
                flatten: true
            }
        }
    });

    //grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    //grunt.registerTask('connect', ['connect']);
    grunt.registerTask('start', ['requirejs:compile', 'imagemin:dynamic', 'uglify:compilejs', 'clean:js', 'cssmin:compilecss', 'copy:fonts']);
    grunt.registerTask('default', []);

};
