const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: 'index.js',
    },

    watchOptions: {
        ignored: '**/node_modules',
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html"
        })
    ],

    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|glb|gltf|tga)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
        ],
    },
};