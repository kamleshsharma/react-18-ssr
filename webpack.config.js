const path = require('path');
const babelOptions = {
    cacheDirectory: true,
    compact: true,
    presets: [
        '@babel/preset-env',
        [
            '@babel/react',
            {
                runtime: 'automatic',
                development: true,
            }
        ]
    ],
    plugins: []
}
const loaders = [
    {
        test: /\.tsx?$/, // Transform all .js and .jsx files required somewhere with Babel
        include: [/src/],
        use: [
            {
                loader: 'babel-loader',
                options: babelOptions
            },
            {
                loader: 'ts-loader'
            }
        ]
    },
    {
        test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
        include: [/src/],
        use: [
            {
                loader: 'babel-loader',
                options: babelOptions
            }
        ]
    },
    {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
    },]
module.exports = [{
    name: 'client',
    mode: 'development',
    entry: path.join(process.cwd(), 'src', 'app', 'index.tsx'),
    output: {
        publicPath: '/',
        path: path.join(process.cwd(), 'build', 'client'),
    },
    module: {
        rules: loaders
    },
    target: 'web',
    resolve: {
        // fallback: {
        //   stream: require.resolve('stream-browserify')
        // },
        extensions: [
            '.tsx',
            '.ts',
            '.js',
            '.jsx',
            '.react.js'
        ],
        alias: {}
    },
}, {
    name: 'server',
    mode: 'development',
    entry: path.join(process.cwd(), 'src', 'server', 'index.ts'),
    output: {
        publicPath: '/',
        path: path.join(process.cwd(), 'build', 'server'),
    },
    module: {
        rules: loaders
    },
    target: 'node',
    resolve: {
        fallback: {
            // "url": require.resolve("url/")
            //   stream: require.resolve('stream-browserify')
        },
        extensions: [
            '.tsx',
            '.ts',
            '.js',
            '.jsx',
            '.react.js'
        ],
        alias: {}
    },
}]