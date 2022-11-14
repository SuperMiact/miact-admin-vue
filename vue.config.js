const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,         // 是否开启eslint检测
  publicPath: '/', // 统一前缀
  assetsDir: 'static',       // 生成静态资源(css,js..)目录
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    client: {
      webSocketURL: 'ws://0.0.0.0:8090/ws',
    },
    open: false,
    // proxy: {
    //   ['/miact-admin']: {
    //     target:`http://localhost:8090`,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + '/miact-admin']: ''
    //     }
    //   }
    // },

  },
})
