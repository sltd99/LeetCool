const chromium = require("chrome-aws-lambda")
const playwright = require("playwright-core")
const { chromium: devChromium } = require("playwright-chromium")

export default async function getQuestionDetail(questionUrl = "") {
  try {
    const browser =
      process.env.NODE_ENV === "production"
        ? await playwright.chromium.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
          })
        : await devChromium.launch()

    const context = await browser.newContext()
    const page = await context.newPage()

    // get daily question
    if (!questionUrl) {
      //Let page goto leetcode website
      await page.goto("https://leetcode.com/problemset/all/")
      //The first row of the rowgroup is today's question
      //In future, we only need to change the css selector
      const textContent = await page.textContent(
        `div[role="rowgroup"] > div:first-child > div > div a[href*="/explore/item"]`
      )
      questionUrl =
        "https://leetcode.com/problems/" +
        textContent.split(". ")[1].toLocaleLowerCase().split(" ").join("-")
    }

    console.log("12312312", questionUrl)

    //Let page goto leetcode problem
    await page.goto(questionUrl)
    //In future, we only need to change the css selector

    //=====================================================================================================
    const questionTitle = await page.textContent(
      `div[data-key*=description-content] > div div[data-cy=question-title]`
    )
    console.log(questionTitle)
    //=====================================================================================================

    //=====================================================================================================
    const diff = await page.textContent(`div[data-key*=description-content] > div div[diff]`)
    console.log(diff)
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
    )
    console.log(questionContentHTML)
    //=====================================================================================================

    //=====================================================================================================
    const tagPromises = await page.$$(`div > a[class*=topic-tag]`)
    let tags = []
    // tagPromises.forEach(async (e) => {
    //   tags.push(await e.innerText());
    // });

    for (const tagPromise of tagPromises) {
      tags.push(await tagPromise.innerText())
    }
    console.log(tags)
    //=====================================================================================================

    await page.close()
    await context.close()
    await browser.close()

    return {
      questionTitle: questionTitle,
      diff: diff,
      questionContentHTML: questionContentHTML,
      tags: tags,
    }
  } catch (error) {
    // TODO Send email to notify if crawler breaks
    console.log("Error", error)
  }
}
