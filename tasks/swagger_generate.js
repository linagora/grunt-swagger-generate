/*
 * grunt-swagger-generate
 * 
 *
 * Copyright (c) 2017 dsnguyen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var path = require('path');
  var fs = require('fs');
  var swaggerJSDoc = require('swagger-jsdoc');

  grunt.registerMultiTask('swagger_generate', 'Grunt plugin for swagger generate', function() {
    var options = this.options();
    var swaggerFile = options.paths;
    var api = [];
    var swaggerOutputFile = path.normalize(options.baseDir + options.outPut);
    swaggerFile.forEach(function(item) {
      api.push(path.normalize(options.baseDir + item));
    });

    var swagger_options = {
      swaggerDefinition: {
        swagger: '2.0',
        info: {
        title: 'OpenPaaS',
        description: 'OpenPaaS API',
        version: '0.1'
        },
        host: 'localhost:8080',
        basePath: '/api/v0.1',
        consumes: ['application/json'],
        produces: ['application/json']
      },
      apis: []
    };
    swagger_options['apis'].push(...api);
    var swaggerSpec = swaggerJSDoc(swagger_options);

    swaggerSpec.securityDefinitions = {
      openpaas_auth: {
        type: 'oauth2',
        description: 'OAuth2 security scheme for the OpenPaaS API',
        flow: 'password',
        tokenUrl: 'localhost:8080/oauth/token'
      }
    };

    try {
      fs.writeFileSync(swaggerOutputFile, JSON.stringify(swaggerSpec));
      grunt.log.ok('API Specification file ' + swaggerOutputFile + ' generated.');
    } catch (error) {
      grunt.log.error('Could not generate API Specification file (' + error + ').');
    }
  });
};
