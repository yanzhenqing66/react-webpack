const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function cssLoaders(options) {
  options = options || {};
  // const cssLoader = {
  //   loader: 'css-loader',  // 转换css
  //   options: {
  //     sourceMap: options.sourceMap
  //   }
  // };

  function generateLoaders(loader, loaderOptions) {
    const loaders = ['css-loader', 'postcss-loader'];
    if (loader) {
      // loaders.push({
      //   loader: loader + "-loader",
      //   options: Object.assign({}, loaderOptions, {
      //     sourceMap: options.sourceMap
      //   })
      // })
      loaders.push(`${loader}-loader`)
    }
    if (options.extract) {
      return [
        // {
        //   loader: MiniCssExtractPlugin.loader,
        // }
        MiniCssExtractPlugin.loader
      ].concat(loaders);
    } else {
      return ['style-loader'].concat(loaders)
    }
  }

  const object = {
    css: generateLoaders(),
    less: generateLoaders("less")
  }
  const output = [];
  for (let key in object) {
    const loader = object[key];
    output.push({
      test: new RegExp('\\.' + key + '$'),
      use: loader
    })
  }
  return output;
}
exports.cssLoaders = cssLoaders