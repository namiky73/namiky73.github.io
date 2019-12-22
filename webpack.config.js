const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  devtool: "source-map",
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public/js')
  },
  // https://ics.media/entry/17376/
  module:{
    rules: [
        {
            test: /\.scss/,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        url: false,
                        importLoaders: 2
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        // sourceMap: enabledSourceMap
                    }
                },
            ]
        }
    ]
  }
  
};