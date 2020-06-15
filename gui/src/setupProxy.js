const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/getData/*",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
      secure: false,
      // pathRewrite: {
      //   "^/test/": "/", // remove base path
      // },
    })
  );
};
