import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import {
  PATHS, prodLoaders, extensions,
  modulesDirectories, alias, plugin } from './base';

export default {
    name: 'browser',
    devtool: 'source-map',
    target: 'web',
    context: PATHS.root,
    entry: {
      app: '../app'
    },
    output: {
      path: PATHS.output,
      filename: PATHS.static.js,
      publicPath: PATHS.publicPath.prod
    },
    module: {
      loaders: prodLoaders
    },
    resolve: {
      extensions: extensions,
      modulesDirectories: modulesDirectories,
      alias: alias
    },
    plugins: [
      new CleanPlugin(plugin.clean.paths, plugin.clean.options),
      new webpack.optimize.OccurenceOrderPlugin(),
      new ExtractTextPlugin(PATHS.static.css),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        __DEV__: false,
        __CLIENT__: true,
        __SERVER__: false
      })
    ]
  };