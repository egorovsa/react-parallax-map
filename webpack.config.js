const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: "development",
	entry: {
		app: "./src/ts/app.ts"
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: "[name].js",
		publicPath: '/'
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 3000
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader'
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {}
					}
				]
			},
			{
				test: /\.styl?$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'stylus-loader',
						options: {},
					},
				],
			}
		]
	},
	plugins: [
		new copyWebpackPlugin([{
			from: './src/index.html',
			to: './'
		}])
	]
};