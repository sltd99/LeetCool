// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import withAuth from "../../auth/withAuth"

import getQuestionDetail from "../../playwright/getQuestionDetail"

const questions = (req, res) => ({
  async get() {
    const question = await getQuestionDetail()

    res.json({
      question,
    })
  },

  async post() {},
})

export default withAuth(questions)
