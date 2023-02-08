/** @type {import('webpack').Configuration} */
module.exports = {
    entry: {
        'webpack-entry-worker-with-ts': './dist/fixtures/worker-with-ts.js',
        'worker-1': './dist/fixtures/worker-1.js',
        'worker-2': './dist/fixtures/worker-2.js',
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
        noParse: [require.resolve('typescript/lib/typescript.js')],
    },
    resolve: {
        fallback: {
            path: require.resolve('@file-services/path'),
            url: require.resolve('url'),
            perf_hooks: false,
        },
    },
    watchOptions: {
        ignored: /node_modules/,
    },
};
