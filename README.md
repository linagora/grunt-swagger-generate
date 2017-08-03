# grunt-swagger-generate

> Grunt plugin for swagger generate

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-swagger-generate --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-swagger-generate');
```


#### Custom dir Options
In this example, custom dir are used to do with any directory we fill to options in grunt file of modules and sure that directory of output file has created.

```js
grunt.initConfig({
  swagger_generate: {
    options: {
      baseDir: __dirname,
      outPut: '/doc/swagger.json',
      paths: [
        '/backend/webserver/api/*.js',
        '/backend/webserver/api/*/*.js',
        '/modules/*/backend/webserver/**/*.js'
      ]
    }
  },
});
```
