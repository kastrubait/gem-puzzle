const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: { main: './src/app/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(gif|jpg|png|svg|mp3|mpe?n)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file-loader'],
      },
      {
        test: /\.(mp3|mpe?g)$/,
        use: ['url-loader'],
      },
      {
        test: /\.mp3$/,
        include: /public/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      title: 'gem-puzzle',
      template: './src/template.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({

      template: 'src/style/style.css',
      filename: 'style.css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new CopyPlugin([
      { from: 'src/public', to: 'public' },
    ]),
  ],
};
