const webpack = require('webpack');

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: {
        'webpack-entry-worker-with-ts': './dist/fixtures/worker-with-ts.js',
        'worker-1': './dist/fixtures/worker-1.js',
        'worker-2': './dist/fixtures/worker-2.js',
        'worker-3-multi-nested': './dist/fixtures/worker-3-multi-nested.js',
        'nested-worker-with-id': './dist/fixtures/nested-worker-with-id.js',
        first: './dist/fixtures/deep/first.js',
        second: './dist/fixtures/deep/second.js',
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
    plugins: [
        new webpack.DefinePlugin({
            __debug: false,
        }),
    ],
    watchOptions: {
        ignored: /node_modules/,
    },
};
