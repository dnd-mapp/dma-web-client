import { expect, test } from '@playwright/test';

test('renders text content', async ({ page }) => {
    await page.goto('');

    expect(await page.textContent('p')).toEqual('WebClientApp works!');
});
