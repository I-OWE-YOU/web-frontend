const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const cachePlugin = new HardSourceWebpackPlugin({
  environmentHash: {
    root: process.cwd(),
    directories: [],
    files: [
      'package-lock.json',
      'yarn.lock',
      '.env',
      '.env.local',
      '.env.production',
      '.env.staging',
      '.env.test',
    ],
  },
})
/** @type import('@vue/cli-service').ProjectOptions */
module.exports = {
  configureWebpack: {
    externals: {
      vue: 'Vue',
    },
    plugins: [cachePlugin],
  },

  // https://github.com/neutrinojs/webpack-chain/tree/v4#getting-started
  chainWebpack(config) {
    // Set up all the aliases we use in our app.
    config.resolve.alias.clear().merge(require('./aliases.config').webpack)

    // Don't allow importing .vue files without the extension, as
    // it's necessary for some Vetur autocompletions.
    config.resolve.extensions.delete('.vue')

    // Only enable performance hints for production builds,
    // outside of tests.
    config.performance.hints(
      process.env.NODE_ENV === 'production' &&
        !process.env.VUE_APP_TEST &&
        'warning'
    )
  },

  css: {
    // Enable CSS source maps.
    sourceMap: true,
  },

  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: 'default',
      overrideEndpoint: false,
      region: 'eu-west-1',
      bucket: 'tegoedje-dev',
      createBucket: true,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: false,
      enableCloudfront: false,
      pluginVersion: '4.0.0-rc3',
      uploadConcurrency: 5,
    },
  },
}
