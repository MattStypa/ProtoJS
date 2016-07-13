'use strict';

/**
 * Convenience hack. Set NODE_PATH if not set and not in production.
 */
if (process.env.NODE_ENV != 'production' && !process.env.NODE_PATH) {
    process.env.NODE_PATH = __dirname;
}

/**
 * NPM modules
 */
require('babel-register');
var _ = require('lodash');
var Gulp = require('gulp');
var GulpUtil = require('gulp-util');
var Jest = require('jest-cli');
var Q = require('q');
var Webpack = require('webpack');

/**
 * Internal modules
 */
var config = require('./config/gulp.js').default;
var server = require('./server/main.js').default;

/**
 * Starts the Express server.
 */
Gulp.task('serve', function serve() {
    server();
});

/**
 * Builds a production bundle.
 */
Gulp.task('build', function build() {
    return runWebpack(_.merge({}, config.webpack.base, config.webpack.prod));
});

/**
 * Builds a development bundle and watches for changes.
 */
Gulp.task('build-dev', function buildDev() {
    return runWebpack(_.merge({}, config.webpack.base, config.webpack.dev));
});

/**
 * Runs test suite.
 */
Gulp.task('test', function test() {
    return runJest(config.jest);
});

/**
 * Runs test suite with coverage report.
 */
Gulp.task('test-coverage', function testCoverage() {
    return runJest(_.merge({}, config.jest, {collectCoverage: true}));
});

/**
 * Starts the Express servers and watches for file changes.
 */
Gulp.task('dev', function dev() {
    Gulp.start('build-dev');
    Gulp.start('serve');
});

/**
 * Runs Jest.
 *
 * @param {Object} jestConfiguration
 * @returns {promise}
 */
function runJest(jestConfiguration) {
    var deferred = Q.defer();

    Jest.runCLI({config: jestConfiguration}, jestConfiguration.rootDir, function jestCallback(pass) {
        if (pass) {
            deferred.resolve();
        } else {
            deferred.reject(new GulpUtil.PluginError('Jest', config.messages.failure));
        }
    });

    return deferred.promise;
}

/**
 * Runs Webpack.
 *
 * @param {object} configuration
 * @returns {promise}
 */
function runWebpack(configuration) {
    var deferred = Q.defer();

    Webpack(configuration, function webpackCallback(error, stats) {
        GulpUtil.log(stats.toString(configuration.stats));

        if (error || stats.hasErrors() || stats.hasWarnings()) {
            deferred.reject(new GulpUtil.PluginError('Webpack', config.messages.failure));
        }
    });

    return deferred.promise;
}
