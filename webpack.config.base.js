/* eslint-disable */
/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import validate from 'webpack-validator';
import {
  dependencies as externals
} from './app/package.json';
import autoprefixer from 'autoprefixer';


export default validate({
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.scss$/,
      loaders:[
        'style-loader?insertAt=top',
        'css-loader?modules&-autoprefixer&importLoaders=1&localIdentName=rst__[local]',
        'postcss-loader',
        'sass-loader',
      ]
    }]
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },

  plugins: [],

  postcss: [
      autoprefixer({ browsers: ['IE >= 9', 'last 2 versions', '> 1%'] }),
  ],

  externals: Object.keys(externals || {})
});
