const { createWebpackConfig } = require('@servicetitan/startup');

module.exports = createWebpackConfig(
    {
        configuration: { mode: 'development' },
    },
    { exposeSharedDependencies: true }
);
