/*
 * grunt-swagger-generate
 */

'use strict';

var path = require('path');
var fs = require('fs');
var swaggerJSDoc = require('swagger-jsdoc');

module.exports = function(grunt) {
  grunt.registerTask('swagger_generate', 'Grunt plugin for swagger generate', function() {
    var options = this.options();
    var swaggerFiles = options.paths;
    var info = options.info;
    var host = options.host;
    var securityDefinitions = options.securityDefinitions;
    var swaggerOutputFile = path.join(options.baseDir, options.swaggerOutputFile);
    var apis = swaggerFiles.map(function(file) {
      return path.join(options.baseDir, file);
    });

    var swagger_options = {
      swaggerDefinition: {
        swagger: '2.0',
        info: info,
        host: host,
        basePath: '/api/v0.1',
        consumes: ['application/json'],
        produces: ['application/json']
      },
      apis: apis
    };
    var swaggerSpec = swaggerJSDoc(swagger_options);

    swaggerSpec.securityDefinitions = securityDefinitions;

    try {
      grunt.log.ok('API Specification file ' + swagger_options.apis + ' generated.');
      fs.writeFileSync(swaggerOutputFile, JSON.stringify(swaggerSpec));
      grunt.log.ok('API Specification file ' + swaggerOutputFile + ' generated.');
    } catch (error) {
      grunt.log.error('Could not generate API Specification file (' + error + ').');
    }
  });
};
