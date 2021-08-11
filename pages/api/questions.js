// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import withAuth from "../../auth/withAuth"

const questions = (req, res) => ({
  async get() {
    res.json({
      hello: "Hi",
    })
  },

  async post() {},
})

export default withAuth(questions)
