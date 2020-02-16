module.exports = {
  style: {
    postcss: {
      plugins: [require("postcss-nested")]
    }
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
};
