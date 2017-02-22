module.exports = {
  stripPrefix: 'build/',
  staticFileGlobs: [
    'build/*.html',
    'build/manifest.json',
    'build/static/**/!(*map*)'
  ],
  "runtimeCaching": [{
    "urlPattern": /^https:\/\/pure-fjord-81149.herokuapp.com\/service-worker.js/,
    "handler": "networkFirst"
  }],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: 'build/service-worker.js'
};
