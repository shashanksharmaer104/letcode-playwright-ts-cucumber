import { Given, When, setDefaultTimeout } from "@cucumber/cucumber"
import { pageFixture } from "../../hooks/pageFixture";
import { expect } from "@playwright/test";

setDefaultTimeout(60 * 1000 * 2);

Given('User navigates to Image Resizer application', async function () {
    await pageFixture.page.goto("https://imageresizer.com/");
});

When('User upload a file {string}', async function (file: string) {
    // Start waiting for file chooser before clicking. Note no await.
    const fileChooserPromise = pageFixture.page.waitForEvent('filechooser');
    await pageFixture.page.getByText('Select Image').nth(0).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("src/test/steps/"+file);
    await pageFixture.page.waitForTimeout(10000);

    await pageFixture.page.waitForLoadState();
    //expect(pageFixture.page.locator("//div[text()='Flip & Rotate'])[1]")).toBeVisible();
});

Given('User navigates to Selenium-Playground application', async function () {
    await pageFixture.page.goto("https://www.lambdatest.com/selenium-playground/upload-file-demo");
});

When('User upload a sample file {string}', async function (file: string) {
    // Start waiting for file chooser before clicking. Note no await.
    /*const fileChooserPromise = pageFixture.page.waitForEvent('filechooser');
    await pageFixture.page.locator("input[id=file]").click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("src/test/steps/"+file);
    await pageFixture.page.waitForTimeout(5000);
    await pageFixture.page.waitForSelector("div[id='error']");*/
    //expect(pageFixture.page.getByText('File Successfully Uploaded')).toBeVisible();

    await pageFixture.page.setInputFiles("input[id='file']", "src/test/steps/"+file);
    await pageFixture.page.waitForTimeout(5000);


});
