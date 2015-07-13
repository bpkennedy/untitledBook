
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
              "src/chapters/ch01.md", // Require Header File.
              //"chapters/content.md" // Chapter Files.
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
                      src: ['**', '!**/epubResources/**', '!**/chapters/**'],
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
          }
        },
        clean: ['TestBook.epub', 'src/chapters/*.html']
    });

    grunt.loadNpmTasks('grunt-contrib-copy', 'grunt-pandoc', 'grunt-contrib-clean');
    grunt.registerTask(
        'compile',
        ['pandoc', 'copy', 'clean']
    );
};
