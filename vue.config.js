const webpack = require('webpack')
module.exports = {
  publicPath: process.env.publicPath,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      }),
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: `@import "@/scss/gtStyle.scss";`
      }
    }
  },
  outputDir: './dist/gtcashview',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
