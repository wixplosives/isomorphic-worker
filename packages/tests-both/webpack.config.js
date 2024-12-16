// @ts-check

import { fileURLToPath } from 'node:url';
import webpack from 'webpack';

/** @type {import('webpack').Configuration} */
export default {
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
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',
                loader: 'source-map-loader',
            },
        ],
        noParse: [fileURLToPath(import.meta.resolve('typescript/lib/typescript.js'))],
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
