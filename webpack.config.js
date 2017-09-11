let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

let config = {
  entry: './app/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      { test: /\.(jsx)$/, use: 'babel-loader' },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
      template: 'app/index.html'
  })],
  devtool: "#eval-source-map"
};

if( process.env.NODE_ENV === 'production' )
{
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify( process.env.NODE_ENV )
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;