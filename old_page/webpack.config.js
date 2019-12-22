module.exports = {
  mode: "development",
  entry: `./src/index.tsx`,
  output: {
    path: `${__dirname}/build`,
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'ts-loader',
          // options: {
          //   sourceMap: true
          // }
        //   options: {
        //     presets: [ '@babel/preset-env', "@babel/react"]
        // }
      }]
    },
    {
      test: /\.scss/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            url: false,
            // sourceMap: true,
            importLoaders: 2
          }
        },
        {
          loader: "sass-loader",
          options: {
            // sourceMap: true
          }
        }
      ]
    }]
  },
  devServer: {
    // put index.html in a root directory for github pages
    contentBase: "./",
    inline: true,
    // publicPath is needed if bundle.js and index.html are not in the same dir.
    publicPath: '/build/',
    open: true
  }
};
