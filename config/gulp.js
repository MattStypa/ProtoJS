/**
 * NPM modules
 */
import Webpack from 'webpack';

export default {
    webpack: {
        base: {
            context: process.env.NODE_PATH,
            entry: ['babel-polyfill', './src/main.js'],
            output: {
                path: 'public/js',
                filename: 'bundle.js'
            },
            resolve: {
                root: process.env.NODE_PATH
            },
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel'
                    }
                ]
            },
            stats: {
                chunks: false,
                colors: true,
                hash: false,
                version: false
            }
        },
        dev: {
            watch: true,
            module: {
                preLoaders: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader'
                }]
            }
        },
        prod: {
            plugins: [
                new Webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify('production') // Build production bundle.
                    }
                }),
                new Webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                }),
                new Webpack.optimize.OccurrenceOrderPlugin()
            ]
        }
    },
    jest: {
        name: 'App',
        rootDir: process.env.NODE_PATH,
        scriptPreprocessor: '<rootDir>/node_modules/babel-jest',
        testDirectoryName: 'tests',
        unmockedModulePathPatterns: ['<rootDir>/node_modules/']
    },
    messages: {
        failure: new Array(3).fill(String.fromCodePoint(0x1F4A9)).join(' ')
    }
};
