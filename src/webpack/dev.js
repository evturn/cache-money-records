import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import {
  PATHS, devLoaders, extensions, plugin,
  alias, modulesDirectories } from './base';

export default {
  debug: true,
  cache: true,
  devtool: 'eval-source-map',
  name: 'browser',
  context: PATHS.root,
  contentBase: PATHS.root,
  entry: {
    app: [
      '../app',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
    ]
  },
  output: {
    path: PATHS.output,
    filename: PATHS.static.js,
    publicPath: PATHS.publicPath.dev
  },
  devServer: {
    outputPath: PATHS.output,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only',
    port: 3000,
    host: 'localhost'
  },
  module: {
    loaders: devLoaders
  },
  resolve: {
    extensions: extensions,
    modulesDirectories: modulesDirectories,
    alias: alias
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new WriteFilePlugin(),
    new ExtractTextPlugin(PATHS.static.css),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      __DEV__: true,
      __CLIENT__: true,
      __SERVER__: false
    }),
  ]
};