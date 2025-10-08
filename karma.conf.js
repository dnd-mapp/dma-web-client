// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

/**
 * @param config {import('karma').config}
 */
module.exports = (config) => {
    config.set({
        basePath: '',
        browsers: ['ChromeHeadless'],
        client: {
            jasmine: {
                // you can add configuration options for Jasmine here
                // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
                // for example, you can disable the random execution with `random: false`
                // or set a specific seed with `seed: 4321`
                random: true,
            },
        },
        coverageReporter: {
            dir: require('path').join(__dirname, './reports/dma-web-client'),
            subdir: '.',
            reporters: [{ type: 'html' }, { type: 'text-summary' }],
        },
        failOnEmptyTestSuite: false,
        frameworks: ['jasmine'],
        jasmineHtmlReporter: {
            suppressAll: true, // removes the duplicated traces
        },
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
        ],
        reporters: ['dots', 'kjhtml'],
        restartOnFileChange: true,
        reportSlowerThan: 300,
    });
};
