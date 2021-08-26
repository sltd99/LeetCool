import React, { useState } from "react"
import { useQuery, QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"

import Select from "react-select"
import Title from "@/components/Question/Title"
import Tags from "@/components/Question/Tags"
import Description from "@/components/Question/Description"
import Loader from "@/components/Base/Loader"
import Solutions from "@/components/Question/Solutions"
import Comments from "@/components/Question/Comments"
import Mardown from "@/components/Question/Markdown"
import { useAxios } from "hooks"

const axios = useAxios()

const fetchAllQuestions = async () => {
  const { data } = await axios.get("/questions")

  return data.questions.map(({ question_id, question_title, question_difficulty }) => ({
    value: question_id,
    label: question_id + ". " + question_title,
  }))
}

const fetchSelectedQuestion = async (questionId, user_id) => {
  const { data } = await axios.post("/questions/" + questionId, {user_id})

  console.log(data.question_answers)
  return data
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery("allQuestions", fetchAllQuestions)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function upload({ session}) {
  // const { data, refetch } = useQuery("todo", fetchTodo)

  const { data } = useQuery("allQuestions", fetchAllQuestions)

  const [questionId, setQuestionId] = useState(null)

  const {
    data: { question_title, question_difficulty, question_tags, question_content, question_answer} = {},
    isLoading,
  } = useQuery(["selectedQuestion", questionId], () => fetchSelectedQuestion(questionId, session.user_id), {
    enabled: !!questionId,
  })

  return (
    <div className="flex flex-col items-center mt-5 mb-10 space-y-3">
      <Select
        instanceId="react-select"
        className="w-[40rem]"
        options={data}
        onChange={question => setQuestionId(question.value)}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#667eea",
          },
        })}
      />

      {questionId &&
        (isLoading ? (
          <div className="!mt-10 w-[40rem]">{<Loader />}</div>
        ) : (
          <>
            <Title difficulty={question_difficulty}>
              {questionId}. {question_title}
            </Title>

            <Tags tags={question_tags} />

            <Description>{question_content}</Description>

            <div className="min-h-[30rem] w-[40rem]">
              <Mardown editable children={ question_answer} questionId={questionId} user_id={ session.user_id} />
            </div>
          </>
        ))}
    </div>
  )
}
