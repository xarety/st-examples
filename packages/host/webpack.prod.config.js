const { createWebpackConfig } = require('@servicetitan/startup');

module.exports = createWebpackConfig(
    {
        configuration: {
            mode: 'production',
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        exclude: /node_modules/,
                        loader: require.resolve('./my-webpack-loader'),
                    },
                ],
            },
        },
    },
    { exposeSharedDependencies: true }
);
