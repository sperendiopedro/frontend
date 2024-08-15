const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/oauth2/authorization/keycloak',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/gateway/, ''),
    })
  );
};