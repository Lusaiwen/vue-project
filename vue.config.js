const path = require('path');

module.exports = {
    // publicPath: '/static',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://library.chinaswust.cn',
                changeOrigin: true
            },
            '/media': {
                target: 'http://library.chinaswust.cn',
                changeOrigin: true
            }
        }
    },
    outputDir: path.resolve(__dirname, '../static')
};
