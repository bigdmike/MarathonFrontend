module.exports = {
    devServer: {
        port: 8080,
        proxy: {
            '/dashboard': {
                target: 'http://172.94.78.42:9002',
                secure: false,
                changeOrigin: true
            }
        }
      },
    css: { extract: false }
}