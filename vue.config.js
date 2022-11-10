const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}


module.exports = {
    lintOnSave: true,
    devServer: {
      host: '81.70.249.58',
    },
    chainWebpack: (config) => {
      config.resolve.alias
        .set('@', resolve('src'))
        .set('@assets',resolve('src/assets'))
        .set('@components',resolve('src/components'))
        .set('@network',resolve('src/network'))
        .set('@router',resolve('src/router'))
        .set('@store',resolve('src/store'))
        .set('@views',resolve('src/views'))
    },
}
