
module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    var sourceDir = 'src',
    outputDir = 'dist',
    depDir = 'node_modules';

    grunt.initConfig({
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
                    { src:"node_modules/angular-moment/angular-moment.min.js", dest:"components/angular-moment.min.js" },
                    { src:"node_modules/moment/min/moment.min.js", dest:"components/moment.min.js" }
                ]
            }
        },
        shell: {
            buildHtmlBook: {
                //this converts all markdown files in src/chapters to a single book.html file
                //using the pandoc utility for conversion
                command: 'pandoc src/chapters/*.md > src/chapters/book.html'
            },
            buildEpubBook: {
                command: 'pandoc -S -o TestBook.epub --epub-metadata=src/epubResources/metadata.xml --epub-stylesheet=src/epubResources/styles/bookStyles.css src/chapters/*.md'
            },
            publishBook: {
                //this pushes to the master subtree and publishes out to the gh-pages branch
                command: 'git subtree push --prefix dist origin gh-pages'
            }
        },
        clean: ['TestBook.epub', 'src/chapters/*.html']
    });

    grunt.loadNpmTasks('grunt-contrib-copy', 'grunt-contrib-clean');
    grunt.registerTask(
        'compile',
        ['shell:buildHtmlBook', 'shell:buildEpubBook', 'copy', 'clean']
    );
    grunt.registerTask(
        'publish',
        ['shell:publishBook']
    );
};
