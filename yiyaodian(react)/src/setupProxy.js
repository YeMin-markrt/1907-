const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {
    app.use('/db', 
        createProxyMiddleware({ 
            target: 'http://gateway.fangkuaiyi.com',
            changeOrigin: true,
            pathRewrite:{
                 "^/db":"/"
                   } 
            }
         ));
}