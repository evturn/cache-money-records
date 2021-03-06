import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export const PATHS = {
  app: path.join(__dirname, '..', '..', 'src'),
  output: path.join(__dirname, '..', '..', 'dist'),
  publicPath: {
    dev: '/dist/',
    prod: '/dist/'
  },
  less: path.resolve(__dirname, '..', 'assets', 'less'),
  static: {
    js: 'js/[name].js',
    css: 'css/app.css',
    img: 'img/[hash].[ext]'
  },
  root: __dirname
};

export const alias = {
  actions:       path.join(__dirname, '../app/actions/'),
  containers:    path.join(__dirname, '../app/containers/'),
  components:    path.join(__dirname, '../app/components/'),
  reducers:      path.join(__dirname, '../app/reducers/'),
  store:         path.join(__dirname, '../app/store/'),
  routes:        path.join(__dirname, '../app/routes'),
  images:        path.join(__dirname, '../assets/img/'),
  less:          path.join(__dirname, '../assets/less/')
};

export const plugin = {
  clean: {
    paths: ['dist'],
    options: {
      root: path.join(__dirname, '..', '..')
    }
  }
};

export const extensions = ['', '.js', '.jsx', '.less'];
export const modulesDirectories = ['app', 'node_modules'];

export const devLoaders = [
  {
    test: /\.js$|\.jsx$/,
    loader: 'babel',
    exclude: /node_modules/,
    include: PATHS.app
  },,{
    test: /\.json$/,
    loader: 'json-loader'
  },{
    test: /\.(eot|ttf|woff|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader'
  },{
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
  },{
    test: /.*\.(gif|png|jpe?g|svg)$/i,
    loaders: [
      `file?hash=sha512&digest=hex&name=${PATHS.static.img}`,
      'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
    ],
    exclude: /less/
  },{
    test: /\.woff2(\?\S*)?$/,
    loader: 'url-loader?limit=100000'
  },{
    test: /\.less$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
    include: /global/
  },{
    test: /\.less$/,
    loader: 'style!css?module&localIdentName=[local]__[hash:base64:5]' +
      '&sourceMap!less?sourceMap&outputStyle=expanded' +
      '&includePaths[]=' + encodeURIComponent(PATHS.less),
    exclude: /global/
  }
];