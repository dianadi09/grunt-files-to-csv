/*
 * grunt-files-to-csv
 *
 *
 * Copyright (c) 2014 Diana Dikovski
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('files_to_csv', 'This is simple plugin that creates a list of files in given destination and writes them to csv file', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
            separator: ', '
        });

        // Iterate over all specified file groups.
        this.files.forEach(function(file) {
            // Concat specified files.
            var src = file.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                return '\"' + filepath.substring(filepath.lastIndexOf("/") + 1) + '\"';
            }).join(grunt.util.normalizelf(options.separator));


            // Write the destination file.
            grunt.file.write(file.dest, src);

            // Print a success message.
            grunt.log.writeln('File "' + file.dest + '" created.');
        });
    });

};