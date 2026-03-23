const HtmlWebpackPlugin = require( "html-webpack-plugin");
//import webpack from "webpack"; // to access built-in plugins

// "style-loader",
module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource', // Копирует файлы в выходную папку
            },
            {
                test: /\.css$/i,
                use: ["style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "@tailwindcss/postcss"
                                    ],
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
    mode: 'development',
    // "@tailwindcss/tailwind.css"
    entry: "./src/index.js",
    plugins: [new HtmlWebpackPlugin({
        'template': "./src/index.html",
    })],
    devServer: {
       static: './dist',
    },
};
