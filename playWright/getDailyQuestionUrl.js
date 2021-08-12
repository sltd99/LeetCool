const { chromium } = require("playwright-chromium");

export default async function getDailyQuestionUrl() {
  try {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    //Let page goto leetcode website
    await page.goto("https://leetcode.com/problemset/all/");
    //The first row of the rowgroup is today's question
    //In future, we only need to change the css selector
    const textContent = await page.textContent(
      `div[role="rowgroup"] > div:first-child > div > div a[href*="/explore/item"]`
    );
    const questionUrl =
      "https://leetcode.com/problems/" +
      textContent.split(". ")[1].toLocaleLowerCase().split(" ").join("-") +
      "/";
    await page.close();
    await context.close();
    await browser.close();
    console.log(questionUrl);

    return questionUrl;
  } catch (error) {
    console.log("Error", error);
  }
}
