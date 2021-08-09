const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} =require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const WebpackBundleAnalyzer =require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const Webpack = require('webpack')

const path = require('path')

let envApi = {}
if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  envApi = {
    'BASEURL': '""'
  }
}else if(process.env.NODE_ENV === 'development') {
  envApi = {
    'BASEURL': '""'
  }
}

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),

  output: {
    filename: 'js/[name].js',  // 打包出的结果文件
    path: path.resolve(__dirname, '../dist')  // 打包到dist目录下
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(css)$/,
        use: [
          process.env.NODE_ENV !== 'development' ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
          },
          // 'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(less)$/,
        use: [
          process.env.NODE_ENV !== 'development' ? MiniCssExtractPlugin.loader : 'style-loader',
          // 'css-loader',
          {
            loader: 'css-loader',
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2|ttf|eot|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024, // url-loader 包含file-loader，这里不用file-loader, 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024, // 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },

  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        APP_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      ...envApi
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),  // 打包出来的文件名
      template: path.resolve(__dirname, '../public/index.html'),  // 指定模板
      inject: true,  // true：默认值，script标签位于html文件的 body 底部
      hash: true,
      minity: {  // 压缩html文件
        removeComments: true,        //去注释
        collapseWhitespace: true,    //压缩空格
        removeAttributeQuotes: true  //去除属性 标签的 引号  例如 <p id="test" /> 输出 <p id=test/>
      }
    }),
    new CopyWebpackPlugin(
      [
        {
          from: path.resolve(__dirname, '../static'),  // 从哪个目录copy
          to: path.resolve(__dirname, '../dist'), // copy到那个目录
        }
      ]
    ),
    new CleanWebpackPlugin(),     // 每次打包，清除上一次的包
    // new WebpackBundleAnalyzer(),  // 打包分析
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json'], // 解析扩展。（当我们通过路导入文件，找不到改文件时，会尝试加入这些后缀继续寻找文件）文件越多放在最前面
    alias: {
      '@': path.resolve(__dirname, "../src") // 在项目中使用@符号代替src路径，导入文件路径更方便
    }
  },

  externals: {

  }
}
