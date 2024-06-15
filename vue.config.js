/* eslint-disable no-unused-vars */
const { defineConfig } = require('@vue/cli-service');
const path = require('path');

const minify =
  process.env.NODE_ENV === 'development'
    ? false
    : {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      };

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/form-generator/' : '/',
  pages: {
    index: {
      entry: 'src/views/index/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      minify,
    },
    preview: {
      entry: 'src/views/preview/main.js',
      template: 'public/preview.html',
      filename: 'preview.html',
      chunks: ['chunk-vendors', 'chunk-common', 'preview'],
      minify,
    },
  },
  devServer: {
    hot: true,
    // port: devPort,
    open: false,
    client: {
      logging: 'info',
      overlay: true,
      progress: true,
    },
    // proxy: {
    //   '/api/mock': {
    //     target: process.env.VUE_APP_PROXY_MOCK,
    //     changOrigin: true,
    //     pathRewrite: { '^/api/mock': '' },
    //   },
    //   '/api': {
    //     target: process.env.VUE_APP_PROXY,
    //     changOrigin: true,
    //     pathRewrite: { '^/api': '' },
    //   },
    // },
  },
  productionSourceMap: false,
  // configureWebpack: {
  //   externals: {
  //     vue: 'Vue',
  //     'vue-router': 'VueRouter',
  //     'element-ui': 'ELEMENT',
  //   },
  // },
  configureWebpack(config) {
    // config.devtool = 'source-map';
    // const sassLoader = require.resolve('sass-loader');
    // config.module.rules
    //   .filter((rule) => {
    //     return rule.test.toString().indexOf('scss') !== -1;
    //   })
    //   .forEach((rule) => {
    //     rule.oneOf.forEach((oneOfRule) => {
    //       const sassLoaderIndex = oneOfRule.use.findIndex((item) => item.loader === sassLoader);
    //       oneOfRule.use.splice(sassLoaderIndex, 0, {
    //         loader: require.resolve('css-unicode-loader'),
    //       });
    //     });
    //   });

    return {
      cache: {
        // 将缓存类型设置为文件系统,默认是 memory。修改 .browserslistrc 后要关闭缓存重新编译
        type: 'filesystem',
        buildDependencies: {
          // 更改配置文件时，重新缓存
          config: [__filename],
        },
      },
      // watchOptions: {
      //   ignored: ['**/message', '**/node_modules'], // https://webpack.docschina.org/configuration/watch/
      // },
      optimization: {
        // 值为"single"会创建一个在所有生成chunk之间共享的运行时文件
        runtimeChunk: 'single',
        moduleIds: 'deterministic',
      },
      externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT',
      },
      resolve: {
        alias: {
          '@': resolve('src'),
        },
        // fallback: {
        // fs: false,
        // util: false,
        // tls: false,
        // net: false,
        // path: false,
        // zlib: false,
        // http: false,
        // https: false,
        // stream: false,
        // crypto: false,
        // path: require.resolve('path-browserify'),
        // 'crypto-browserify': require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
        // },
      },
    };
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
});
