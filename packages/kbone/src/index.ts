import { IApi, utils } from 'umi';
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const MpPlugin = require('mp-webpack-plugin') // 用于构建小程序代码的 webpack 插件

const isOptimize = true // 是否压缩业务代码，开发者工具可能无法完美支持业务代码使用到的 es 特性，建议自己做代码压缩

export default (api: IApi) => {
  if (!api.userConfig.kbone) return;
  api.describe({
    key: 'kbone',
    config: {
      schema(joi) {
        return joi.boolean();
      },
    },
  });
  api.modifyBundleConfigOpts(() => { entry: { } })
  // process.env.NODE_ENV = 'production';
  api.chainWebpack((config, { webpack }) => {
    config.merge({
      // mode: 'production',
      // entry: {
      //   // js 入口
      //   index: path.join(api.paths.absSrcPath, 'pages/index/index.tsx'),
      //   item: path.join(api.paths.absSrcPath, 'pages/item/index.tsx'),
      //   list: path.join(api.paths.absSrcPath, 'pages/list/index.tsx'),
      // },
      // output: {
      //   path: path.resolve(__dirname, './miniprogram/common'), // 放到小程序代码目录中的 common 目录下
      //   filename: '[name].js', // 必需字段，不能修改
      //   library: 'createApp', // 必需字段，不能修改
      //   libraryExport: 'default', // 必需字段，不能修改
      //   libraryTarget: 'window', // 必需字段，不能修改
      // },
      // target: 'web', // 必需字段，不能修改
      optimization: {
        runtimeChunk: false, // 必需字段，不能修改
        splitChunks: { // 代码分割配置，不建议修改
          chunks: 'all',
          minSize: 1000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 100,
          maxInitialRequests: 100,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        },

        // minimizer: isOptimize ? [
        //   // 压缩CSS
        //   new OptimizeCSSAssetsPlugin({
        //     assetNameRegExp: /\.(css|wxss)$/g,
        //     cssProcessor: require('cssnano'),
        //     cssProcessorPluginOptions: {
        //       preset: ['default', {
        //         discardComments: {
        //           removeAll: true,
        //         },
        //         minifySelectors: false, // 因为 wxss 编译器不支持 .some>:first-child 这样格式的代码，所以暂时禁掉这个
        //       }],
        //     },
        //     canPrint: false
        //   }),
        //   // 压缩 js
        //   new TerserPlugin({
        //     test: /\.js(\?.*)?$/i,
        //     parallel: true,
        //   })
        // ] : [],
      },
    });
    // entry: {
    //   // js 入口
    //   index: path.join(api.paths.absSrcPath, 'pages/index/index.tsx'),
    //   item: path.join(api.paths.absSrcPath, 'pages/item/index.tsx'),
    //   list: path.join(api.paths.absSrcPath, 'pages/list/index.tsx'),
    // },
    // config
    //   .entry('index')
    //   .add(path.join(api.paths.absSrcPath, 'pages/index/index.tsx'))
    // config
    //   .entry('item')
    //   .add(path.join(api.paths.absSrcPath, 'pages/item/index.tsx'))
    // config
    //   .entry('list')
    //   .add(path.join(api.paths.absSrcPath, 'pages/list/index.tsx'))
    config.target('web')
    config
      // 修改 output 配置
      .output
      .path(path.join(api.paths.absSrcPath!, '../miniprogram/common'))
      .filename('[name].js')
      .library('createApp')
      .libraryExport('default')
      .libraryTarget('window');

    config.plugin('mini-css-extract-plugin').use(require('mini-css-extract-plugin'), [{
      filename: '[name].wxss',
    }])
    config
      .plugin('mp-webpack-plugin')
      .use(require('mp-webpack-plugin'), [
        {
          // 页面 origin，默认是 https://miniprogram.default
          origin: 'https://test.miniprogram.com',
          // 入口页面路由，默认是 /
          entry: '/',
          // 页面路由，用于页面间跳转
          router: {
            // 路由可以是多个值，支持动态路由
            index: [
              '/(home|index)?',
              '/test/(home|index)',
            ],
            list: [
              '/test/list/:id',
            ],
            item: [
              '/test/detail/:id',
            ],
          },
          // 项目配置，会被合并到 project.config.json
          projectConfig: {
            appid: 'wxb28f1d41e3bff0c8',
            projectname: 'kbone-demo',
          },
        },
      ]);
    return config;
  });
};
