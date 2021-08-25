import { useRouter } from "next/dist/client/router"
import React from "react"

import Title from "@/components/Question/Title"
import Tags from "@/components/Question/Tags"
import Description from "@/components/Question/Description"
import Solutions from "@/components/Question/Solutions"
import Comments from "@/components/Question/Comments"

import { useQuery, QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"
import { useAxios } from "hooks"

const axios = useAxios()

const fetchQuestion = async questionId => {
  const { data } = await axios.get("/questions/" + questionId)
  return data
}

export async function getServerSideProps({ params }) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery("question", () => fetchQuestion(params.question_id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function Solution() {
  const { question_id } = useRouter().query

  const {
    data: {
      question_title,
      question_difficulty,
      question_tags,
      question_content,
      question_answers,
    },
  } = useQuery("question", () => fetchQuestion(question_id))

  return (
    <div className="flex flex-col items-center mt-5 space-y-3">
      <Title difficulty={question_difficulty}>
        {question_id}. {question_title}
      </Title>

      <Tags tags={question_tags} />

      <Description>{question_content}</Description>

      <div className="flex flex-col space-y-5 min-h-[30rem]">
        {question_answers.map(qa => (
          <Solutions key={qa._id} user={qa.user.user_name}>
            {qa.question_answer}
          </Solutions>
        ))}
      </div>

      <Comments />
    </div>
  )
}
