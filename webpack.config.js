var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var glob = require('glob');

module.exports = {
  entry: './example/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: '$'
        }]
      },
      {
        test:/\.(scss|css|sass)/,
        loader:'style-loader!css-loader!sass-loader'//ExtractTextPlugin.extract("style-loader","css-loader","sass-loader")
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader!stylus-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader!stylus-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test:/\.png/,
        loader:'url-loader',/*把小于1KB的图片base-64内联，减少http请求*/
        query:{limit:1024}
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions:['.js','.vue','.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'jquery':'jquery/src/jquery.js'//引入jquery插件需要用到
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    inline:true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    //js文件压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true
    }),
    //提供全局的变量，在模块中使用无需用require引入
   new webpack.ProvidePlugin({
      jQuery:'jquery',
      $: 'jquery',
      "window.jQuery": "jquery"
    }),//直接定义第三方库*/

    //将公共代码抽离出来合并为一个文件
    /*new CommonsChunkPlugin("common.chunk.js"),*/
    new ExtractTextPlugin('')

  ]
}


