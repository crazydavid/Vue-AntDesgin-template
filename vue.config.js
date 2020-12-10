'use strict'
const path = require('path')
const name = 'vue Element Admin' // page title
function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 9527 // dev port

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV === 'development',
  runtimeCompiler: false,
  productionSourceMap: false,
  parallel: false,
  devServer: {
    host: 'localhost',
    port: port, // 端口号
    open: true, // 配置自动启动浏览器
    disableHostCheck: true
  },
  // css 全局配置
  // css: {
  //   loaderOptions: {
  //     less: {
  //       // 这里的选项会传递给 less-loader
  //       lessOptions: {
  //         modifyVars: { // 这里是自定义的主题颜色，全部变量属性参照官方
  //           'primary-color': '#1DA57A',
  //           'link-color': '#1DA57A',
  //           'border-radius-base': '2px'
  //         },
  //         javascriptEnabled: true // 这句话必须要，否则不起效
  //       }
  //     }
  //   }
  // },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
