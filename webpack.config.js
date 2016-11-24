module.exports =  {
    //entry: ["webpack-dev-server/client?http://localhost:8080/webpack-dev-server/public/final", "./client/src/main.js"],
    entry: "./client/src/main.js",
    output: {
        path: __dirname,
        filename: "client/public/final.js"
    },
    devtool: "source-map",
    module: {
        loaders: [
            { test: /\.js$/, loaders: ["babel"], exclude: /node_modules/ },
            { test: /\.scss$/, loaders: ["style", "css", "sass"] }
        ]
    }
}