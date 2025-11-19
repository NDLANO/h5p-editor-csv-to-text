import path from 'path';
import { fileURLToPath } from 'url';
import process from 'node:process';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import unpluginJsonDts from 'unplugin-json-dts/webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mode = process.argv.includes('--mode=production')
  ? 'production'
  : 'development';
const isDev = mode !== 'production';

export default {
  mode,
  entry: {
    'h5p-editor-csv-to-text': path.join(
      __dirname,
      'src',
      'h5p-editor-csv-to-text.ts',
    ),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    unpluginJsonDts(),
  ],
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env'] },
          },
          { loader: 'ts-loader' },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  ...(isDev && { devtool: 'inline-source-map' }),
};
