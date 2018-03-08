const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3001',
      'webpack/hot/only-dev-server',
      './src/index.js',
    ],
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': process.env.NODE_ENV
    })
  ],

  resolve: {
    alias: { _: path.resolve(__dirname, 'src') },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['es2015', { modules: false }],
              'react',
            ],
            plugins: [
              'react-hot-loader/babel',
              'react-require',
              'transform-object-rest-spread',
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },

          {
            loader: 'css-loader'
          },

          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [
                  autoprefixer,
                ]
              },
            },
          },

          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: './images/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
}