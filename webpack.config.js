module.exports =  {
    entry: ["webpack-dev-server/client?http://localhost:8080/webpack-dev-server/public", "./src/main.js"],
    output: {
        path: __dirname,
        filename: "public/final.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ["babel"], exclude: /node_modules/ },
            { test: /\.scss$/, loaders: ["style", "css", "sass"] }
        ]
    }
}