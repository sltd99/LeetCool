const { chromium } = require("playwright-chromium");

export default async function (questionURL) {
  try {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    //Let page goto leetcode problem
    await page.goto(questionURL);
    //In future, we only need to change the css selector

    //=====================================================================================================
    const questionTitle = await page.textContent(
      `div[data-key*=description-content] > div div[data-cy=question-title]`
    );
    console.log(questionTitle);
    //=====================================================================================================

    //=====================================================================================================
    const diff = await page.textContent(
      `div[data-key*=description-content] > div div[diff]`
    );
    console.log(diff);
    //=====================================================================================================

    //=====================================================================================================
    // const questionContentText = await page.innerText(
    //   `div[data-key*=description-content] > div div[class*=question-content]`
    // );
    // console.log(questionContentText);
    //=====================================================================================================

    //=====================================================================================================
    const questionContentHTML = await page.innerHTML(
      `div[data-key*=description-content] > div div[class*=question-content]`
    );
    console.log(questionContentHTML);
    //=====================================================================================================

    //=====================================================================================================
    const tagPromises = await page.$$(`div > a[class*=topic-tag]`);
    let tags = [];
    // tagPromises.forEach(async (e) => {
    //   tags.push(await e.innerText());
    // });

    for (const tagPromise of tagPromises) {
      tags.push(await tagPromise.innerText());
    }
    console.log(tags);
    //=====================================================================================================

    await page.close();
    await context.close();
    await browser.close();

    return {
      questionTitle: questionTitle,
      diff: diff,
      questionContentHTML: questionContentHTML,
      tags: tags,
    };
  } catch (error) {
    console.log("Error", error);
  }
}
