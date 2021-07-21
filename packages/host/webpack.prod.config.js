const { createWebpackConfig } = require('@servicetitan/startup');

module.exports = createWebpackConfig(
    {
        configuration: { mode: 'production' },
    },
    { exposeSharedDependencies: true }
);
