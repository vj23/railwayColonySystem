'use strict';
const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: './src/index',
    common: './src/common',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../app-microservice/src/main/resources/public/public'),
    publicPath: '/public/',
  },
  resolve: {
    modules: ['src', 'node_modules'],
    // allows you to require without the .js at end of filenames
    // import Component from 'component' vs. import Component from 'component.js'
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loaders: ['ts-loader'] },

      { test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: true } },
          ],
        }) },
      { test: /\.less$/, loader: ExtractTextPlugin.extract(
        {
          fallback: 'style-loader', use: [{
            loader: 'css-loader', // translates CSS into CommonJS
          }, {
            loader: 'less-loader', // compiles Less to CSS
          }],
        }),
      },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
      {
        test: /\.ttf$|\.eot$|\.svg$|\.woff2$|\.woff$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[hash].[ext]',
        },
        // include: PATHS.fonts
      },


    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

};
