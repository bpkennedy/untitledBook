
module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    var sourceDir = 'src',
    outputDir = 'dist',
    depDir = 'node_modules';

    grunt.initConfig({
        pandoc: {
            TestBook: { // OUTPUT file name
                configs: {
                    "publish"   : 'EPUB',                 // Publish File Format.
                    "title"     : "TestBook",        // EPUB Title
                    "metadata"  : "src/epubResources/metadata.xml", // EPUB include META data File Path.
                    "stylesheet": "src/epubResources/styles/bookStyles.css",     // EPUB include StyleSheet File Path.
                    "coverImage" : "src/epubResources/images/cover.jpg"
                },
                files: {
                    "chapters": [
                        "src/chapters/ch01.md",
                        "src/chapters/ch02.md" // Chapter Files.
                    ]
                }
            },
            TestBookHTML: {
                configs: {
                    "publish"   : 'HTML'       // Publish File Format.
                },
                files: {
                    "from": [
                        "src/chapters/ch01.md",
                    ]
                }
            }
        },
        copy: {
            'src': {
                files: [
                    {
                        cwd: sourceDir,
                        src: ['!**/epubResources/**', '!**/chapters/**'],
                        dest: outputDir,
                        expand: true
                    },
                    {
                        cwd: sourceDir + '/app/',
                        src: ['**/*'],
                        dest: outputDir,
                        expand: true
                    }
                ]
            },
            'epubBook': {
                files: [
                    {
                        src: ['./*.epub'],
                        dest: outputDir,
                        expand: true
                    }
                ]
            },
            'htmlBook': {
                files: [
                    {
                        flatten: true,
                        src: ['./src/chapters/*.html'],
                        dest: outputDir,
                        expand: true
                    }
                ]
            },
            'reqs': {
                files: [
                    { src:"node_modules/angular-moment/angular-moment.min.js", dest:"dist/components/angular-moment.min.js" },
                    { src:"node_modules/moment/min/moment.min.js", dest:"dist/components/moment.min.js" }
                ]
            }
        },
        shell: {
            buildBook: {
                //this converts all markdown files in src/chapters to a single book.html file
                command: 'pandoc src/chapters/*.md > src/chapters/book.html'
            },
            publishBook: {
                //this pushes to the master subtree and publishes out to the gh-pages branch
                command: 'git subtree push --prefix dist origin gh-pages'
            }
        },
        clean: ['TestBook.epub', 'src/chapters/*.html']
    });

    grunt.loadNpmTasks('grunt-contrib-copy', 'grunt-pandoc', 'grunt-contrib-clean');
    grunt.registerTask(
        'compile',
        ['shell:buildBook', 'pandoc', 'copy', 'clean']
    );
    grunt.registerTask(
        'publish',
        ['shell:publishBook']
    );
};
