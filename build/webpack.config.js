const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today = new Date();

module.exports = {
   module: {
      rules: [
         {
            test: /\.scss$/i,
            use: [
               "style-loader",
               "css-loader",
               "sass-loader"
            ]
         },
         {
            test:/\.tsx?$/,
            use:[{
               loader:"ts-loader"
            }],
            exclude:/node_modules/,
         },
         {
            test:/\.json$/i,
            type:"asset/resource",
         }
      ]
   },
  
   plugins: [
      new HtmlWebpackPlugin({
         title: "Kinderfoor Kuurne",
         buildDate: (new Date()).toLocaleDateString("nl-BE"),
         buildYear: (new Date()).getFullYear(),
         template: "./src/index.html",
         chunks: ['main','shared']
      }),
      new CopyPlugin({'patterns': [
        {from:'./src/img/', to:'img'}
      ]}),
   ],
   optimization:{
      minimize:true,
      minimizer:[
         new JsonMinimizerPlugin()
      ]
   },
   resolve:{
      extensions:['.tsx','.ts','.js']
   },
   entry: {
      "main":{import:path.resolve(__dirname,'../src/ts/view/index.ts'), dependOn:'shared'},
      "shared" :{import:path.resolve(__dirname,'../src/style/_shared.scss')}
   },
   output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].bundle.js',
   },
   mode:'production'
}