const { getDefaultConfig } = require('expo/metro-config')

module.exports = (() => {
    const config = getDefaultConfig(__dirname)

    const { transformer } = config

    config.transformer = {
        ...transformer,
    }

    config.resolver.assetExts.push('cjs');

    return config
})()
