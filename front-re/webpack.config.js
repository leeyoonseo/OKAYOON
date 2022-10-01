const path = require("path");
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

const config = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'hidden-source-map' : 'eval',
  entry: {
    app: './client.tsx',
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/dist/",
    clean: true,
  },
  devServer: {
    historyApiFallback: true,
    port: 3090,
    devMiddleware: { publicPath: '/dist/' },
    static: { directory: path.resolve(__dirname) },
    // proxy: {
    //   '/api/': {
    //     target: 'http://localhost:3095', 
    //     changeOrigin: true,
    //   },
    // },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new webpack.EnvironmentPlugin({ 
      NODE_ENV: isProduction ? 'production' : 'development' 
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['last 2 chrome versions', 'IE 10'] },
                debug: !isProduction,
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          env: {
            development: {
              plugins: [['@emotion', { sourceMap: true }], require.resolve('react-refresh/babel')],
            },
            production: {
              plugins: ['@emotion']
            }
          },
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          stylesHandler, 
          "css-loader", 
          "postcss-loader", 
          "sass-loader"
        ],
      },
      {
        test: /\.css$/i,
        use: [
          stylesHandler, 
          "css-loader", 
          "postcss-loader"
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "json"],
    alias: {
      '@src': path.resolve(__dirname, './src'),
    }
  },
};

if (isProduction && config.plugins) {
  config.plugins.push(new MiniCssExtractPlugin());
  config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
} else {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: true }));
}


module.exports = config;