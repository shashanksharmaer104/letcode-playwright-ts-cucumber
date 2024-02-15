import { Before, After, BeforeAll, AfterAll, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function() {
    browser = await chromium.launch({ headless: false});
});

Before(async function() {
    context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page = page;
});

After(async function({ pickle, result }) {
    let img: Buffer;
    console.log("Scenario status: " + pickle.name + " ==> " + result?.status);
    // take screenshot
    if(result?.status == Status.PASSED) {
        img = await pageFixture.page.screenshot({
            path: `./test-result/screenshots/${pickle.name}.png`, type: "png"
        });
        this.attach(img, "image/png");
    }
    await pageFixture.page.close();
    await context.close();
});

AfterAll(async function() {
    await browser.close();
});