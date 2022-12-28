/** @type {import('webpack').Configuration} */
module.exports = {
    devtool: 'source-map',
    output: {
        libraryTarget: 'umd',
        globalObject: 'self',
    },
    resolve: {
        fallback: {
            // path: require.resolve('@file-services/path'),
            // url: require.resolve('url'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg|woff2|ttf)$/i,
                type: 'asset',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',
                loader: 'source-map-loader',
            },
        ],
    },
    watchOptions: {
        ignored: /node_modules/,
    },
};
