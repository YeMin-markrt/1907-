const {createProxyMiddleware} = require("http-proxy-middleware");
module.exports = function (app) {
    app.use("/api",createProxyMiddleware({
        target:"http://127.0.0.1/8081",
        changeOrigin:true,
        pathRewrite:{
            "^/api":""
        }
    }));
    app.use("/songshu",createProxyMiddleware({
      target:"http://m.3songshu.com",
      changeOrigin:true,
      pathRewrite:{
          "^/songshu":""
      }
  }));
}