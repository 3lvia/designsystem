const path = require('path'); const resolvePackage = relativePath => path.resolve(__dirname, relativePath); module.exports = {
    webpack: {
        alias: {
            react: resolvePackage('./node_modules/react')
        }
    }
}