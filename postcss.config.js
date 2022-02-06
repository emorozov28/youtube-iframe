const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
    plugins: [
        autoprefixer(),
        postcssPresetEnv({browsers: 'last 3 versions'})
    ]
}