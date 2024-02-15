import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { pageFixture } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2);

When('user search for a {string}', async function (book: string) {
    await pageFixture.page.locator("//input[@type='search']").fill(book);
    await pageFixture.page.waitForTimeout(2000);
    await pageFixture.page.locator("//mat-option[@role='option']//span[1]").click();
});

When('user add the book to the cart', async function () {
    await pageFixture.page.click("//button[@color='primary']");
});

Then('the cart badge should get updated', async function () {
    const badgeCount = await pageFixture.page.locator("#mat-badge-content-0").textContent();
    expect(Number(badgeCount)).toBeGreaterThan(0);
});