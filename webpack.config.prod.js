import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, '/dist/'),
    publicPath: '/client/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  target: 'web',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
        warnings: false,
        pure_funcs: ['console.log', 'window.console.log.apply']
      },
      comments: false
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Hammer: 'hammerjs/hammer'
    })
  ],
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /.jsx?$/,
        enforce: 'pre',
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: path.join(__dirname, '/client'),
        exclude: /node_modules/,
      },
      { test: /(\.s?css)$/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap')
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'

      },
      { test: /\.woff2(\?\S*)?$/,
        loader: 'url-loader?limit=100000'
      },
      { test: /\.woff(\?\S*)?$/,
        loader: 'url-loader?limit=100000'
      },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,

        loader: 'url-loader?limit=100000&mimetype=application/octet-stream'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?name=/assets/img/[name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }],
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /materialize-css\/bin\//,
        loader: 'imports-loader?jQuery=jquery,$=jquery,hammerjs'
      },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,

        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
    ]
  },
  resolve: { extensions: ['.js', '.jsx', '.css'] },
  node: {
    dns: 'empty',
    net: 'empty',
    fs: 'empty'
  }
};
