/** @type {import('webpack').Configuration} */
export default {
    devtool: 'source-map',
    output: {
        libraryTarget: 'umd',
        globalObject: 'self',
    },
    resolve: {},
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
