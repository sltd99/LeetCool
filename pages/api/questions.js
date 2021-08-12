// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import withAuth from "../../auth/withAuth";

import getDailyQuestionUrl from "../../playWright/getDailyQuestionUrl";

import getQuestionDetail from "../../playWright/getQuestionDetail";

const questions = (req, res) => ({
  async get() {
    const url = await getDailyQuestionUrl();
    const question = await getQuestionDetail(url);

    res.json({
      question,
    });
  },

  async post() {},
});

export default withAuth(questions);
