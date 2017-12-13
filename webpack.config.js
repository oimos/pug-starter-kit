const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

const webpackConfig = {
	devtool: 'source-map',
    cache: false,
	entry: [
		path.resolve(__dirname, './src/js/index.js')
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './dist/js'),
		publicPath: './js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'es2015'
							],
							cacheDirectory: false
						}
					}
				]
			},
			{
				test: /\.css$/,
				loader: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => (
									[
										require('postcss-cssnext')(
											{ browsers: ['> 0.01%'] }
										),
										require('postcss-flexbugs-fixes')
									]
								)
							}
						}
					]
				}))
			},
			{
				test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: '../img/',
							publicPath: '/img/',
						}
					}
				]
			},
			{
				test: /\.pug$/,
				use: [
					{
						loader: 'pug-loader',
						options: {
							pretty: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new WebpackBuildNotifierPlugin(),
		new HtmlWebpackPlugin({
			template: './src/pug/index.pug',
			filename: '../index.html',
		}),
		new HtmlWebpackPugPlugin(),
		new ExtractTextPlugin( '../css/style.css' ),
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: { baseDir: path.resolve(__dirname, 'dist') },
			files: [
				'./dist/*.js',
				'./dist/*.css',
				'./dist/*.html'
			]
		})
	]
}

module.exports = webpackConfig;