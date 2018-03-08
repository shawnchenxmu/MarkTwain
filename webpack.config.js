const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
		path: path.join(__dirname, '/build'),
		filename: '[name].js'
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),

    new ExtractTextPlugin('[name].css'),

		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			comments: false,
			compress: {
				warnings: false,
				drop_console: true,
				collapse_vars: true
			}
		})
	],

	resolve: {
    alias: { _: path.resolve(__dirname, 'src') },
    modules: [
      "node_modules"
    ],
    extensions: ['.js', 'jsx', '.css']
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
              ['es2015', { 'modules': false }],
              'react'
            ],
            plugins: [
              'react-require',
              'transform-object-rest-spread'
            ]
          }
        }
     	},

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use:[
            {
              loader: 'css-loader',
              options:{
                minimize: true //css压缩
              }
            }
          ],
          fallback: 'style-loader'
        })
      },

      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'sass-loader'
            },
          ],
          fallback: 'style-loader'
        })
      },

      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: './images/[name].[ext]'
            }
          }
        ]
      }
    ]
  }
}