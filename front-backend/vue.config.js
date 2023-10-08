const { defineConfig } = require('@vue/cli-service')
const url = 'http://127.0.0.1:3000';

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/': {
        target: url,
        ws: false,
        pathRewrite: {
          '^/': '/',
        }
      }
    }
  }
})
