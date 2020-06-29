const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  publicPath: '',
  outputDir: './dist/assets',
  indexPath: 'iframe.html',
  css: {
    extract: false
  },
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    output: {
      filename: 'app.js'
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: './zat',
          to: '../',
          ignore: ['manifest.json']
        },
        {
          from: './zat/manifest.json',
          to: '../manifest.json',
          transform(content) {
            return buildZendeskManifest(Buffer.from(content.toJSON()))
          }
        }
      ])
    ]
  },
  filenameHashing: false,
  productionSourceMap: false,
  transpileDependencies: ['vuetify']
}

// Build Zendesk 'manifest.json' for production (handle url/prodUrl)
function buildZendeskManifest(content) {
  const data = JSON.parse(content)

  if (data && data.location) {
    for (const locationKey in data.location) {
      const currentLocation = data.location[locationKey]

      for (const itemKey in currentLocation) {
        if (currentLocation[itemKey].url && currentLocation[itemKey].prodUrl) {
          currentLocation[itemKey].url = currentLocation[itemKey].prodUrl
          delete currentLocation[itemKey].prodUrl
        }
      }
    }
  }

  return JSON.stringify(data, null, 2)
}
