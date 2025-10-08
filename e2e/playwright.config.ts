import { defineConfig, devices } from '@playwright/test';

const isCI = Boolean(process.env['CI']);
const baseUrl = isCI ? 'http://localhost:4200' : 'https://localhost.www.dndmapp.dev:4200';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    failOnFlakyTests: isCI,
    forbidOnly: isCI,
    fullyParallel: true,
    globalSetup: [],
    globalTeardown: [],
    name: 'web-client',
    outputDir: '../reports/e2e',
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    reporter: [['html', { outputFolder: '../reports/e2e' }], ['dot']],
    retries: isCI ? 2 : 0,
    testDir: 'src',
    use: {
        baseURL: baseUrl,
        colorScheme: 'dark',
        ignoreHTTPSErrors: true,
        trace: 'on-first-retry',
        ...(isCI
            ? null
            : {
                  clientCertificates: [
                      {
                          origin: 'https://localhost.www.dndmapp.dev:4200',
                          certPath: '../certificate.pem',
                          keyPath: '../certificate-key.pem',
                      },
                  ],
              }),
    },
    webServer: {
        command: isCI ? 'npm run start:http' : 'npm run start',
        ignoreHTTPSErrors: true,
        reuseExistingServer: !isCI,
        url: baseUrl,
    },
    ...(isCI ? { workers: 1 } : {}),
});
