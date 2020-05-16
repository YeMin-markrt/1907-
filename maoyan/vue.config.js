
module.exports = {
  
    devServer: {
        //设置代理
        proxy: {
          "/api": {
            target:'http://m.maoyan.com', // 域名
            //ws: true, // 是否启用websockets
            secure: false,
            changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
            pathRewrite: {
              "^/api": "/"
            }
          }
        },
    },
    // proxyTable: {
    //   '/api': {   //这里是我配置的名字
    //     target:, //你要请求的第三方接口
    //     // ws: true,
    //     changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //     pathRewrite: {'^/api': '/'}    //这里重写路径运行后就代理到对应地址
    //   },
    // },
 
 lintOnSave: false,

  css: {
      loaderOptions: {
          css: {
              // options here will be passed to css-loader
          },
          postcss: {
              // options here will be passed to postcss-loader
              plugins: [require('postcss-px2rem')({
                  remUnit: 75, //设计稿的 十分之一
                  "exclude": /node_modules/i
              })]
          }
      }
  },
  
}

