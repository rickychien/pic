module.exports = {
  entry: __dirname + '/src/js/main.js',
  output: {
    path: __dirname + '/dist/resources/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel?stage=1',
        include: /src/
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.jpe?g$|\.gif$|\.png|\.woff2?|\.ttf|\.eot|\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url'
      }
    ]
  }
}
