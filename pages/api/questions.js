// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import withAuth from "../../auth/withAuth"

const chromium = require("chrome-aws-lambda")
const playwright = require("playwright-core")

const questions = (req, res) => ({
  async get() {
    const question = await getQuestionDetail()

    res.json({
      question,
    })
  },

  async post() {},
})

export async function getQuestionDetail(questionUrl = "") {
  try {
    const browser = await playwright.chromium.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    })

    const context = await browser.newContext()
    const page = await context.newPage()

    if (!questionUrl) {
      await page.goto("https://leetcode.com/problemset/all/")
      const textContent = await page.textContent(
        `div[role="rowgroup"] > div:first-child > div > div a[href*="/explore/item"]`
      )
      questionUrl =
        "https://leetcode.com/problems/" +
        textContent.split(". ")[1].toLocaleLowerCase().split(" ").join("-")
    }

    console.log("12312312", questionUrl)

    await page.goto(questionUrl)

    const questionTitle = await page.textContent(
      `div[data-key*=description-content] > div div[data-cy=question-title]`
    )

    const diff = await page.textContent(`div[data-key*=description-content] > div div[diff]`)

    const questionContentHTML = await page.innerHTML(
      `div[data-key*=description-content] > div div[class*=question-content]`
    )
    const tagPromises = await page.$$(`div > a[class*=topic-tag]`)
    let tags = []

    for (const tagPromise of tagPromises) {
      tags.push(await tagPromise.innerText())
    }
    console.log(tags)

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

export default withAuth(questions)
