const path = require('path');
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
		path: path .resolve(__dirname, './dist/js'),
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
				use: [
					{
						loader: 'style-loader',
					},
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
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: '../img/',
							publicPath: '',
						}
					}
				]
			},
			{
				test: /\.(svg|eot|ttf|woff|woff2)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: '../fonts/',
							publicPath: '',
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