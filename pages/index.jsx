import Table from "../components/Base/Table"
import { useQuery, QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"
import { useMemo } from "react"
import { useAxios } from "hooks"

const axios = useAxios()

const fetchQuestions = async () => {
  const { data } = await axios.get(process.env.BACKEND_URL + "/questions")
  return data
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery("questions", fetchQuestions)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function Home() {
  const { data: rawData } = useQuery("questions", fetchQuestions)

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title", // accessor is the "key" in the data
      },
      {
        Header: "Difficulty",
        accessor: "difficulty",
      },
      {
        Header: "Tags",
        accessor: "tags",
      },
      {
        Header: "Solutions",
        accessor: "solutions",
        Cell: ({ value }) => (
          <div className="flex space-x-3">
            {value.map(user => (
              <span
                key={user.name}
                className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-500"
              >
                <span className="text-xs font-medium leading-none text-white">{user.name[0]}</span>
              </span>
            ))}
          </div>
        ),
      },
      {
        Header: "Last Submitted",
        accessor: "lastSubmitted",
      },
    ],

    []
  )

  const data = useMemo(() => {
    const { question_id } = rawData.daily

    return [
      {
        questionId: question_id.question_id,
        title: question_id.question_id + ". " + question_id.question_title,
        difficulty: question_id.question_difficulty,
        tags: question_id.question_tags.join(", "),
        solutions: [
          {
            name: "Alex",
          },
          {
            name: "Longlong",
          },
        ],
        lastSubmitted: "1/1/2021",
      },
    ].concat(
      rawData.questions.map(
        ({ question_id, question_tags, question_title, question_difficulty }) => ({
          questionId: question_id,
          title: question_id + ". " + question_title,
          difficulty: question_difficulty,
          tags: question_tags.join(", "),
          solutions: [
            {
              name: "Alex",
            },
            {
              name: "Longlong",
            },
          ],
          lastSubmitted: "1/1/2021",
        })
      )
    )
  }, [rawData])

  console.log(rawData)

  return <Table data={data} columns={columns} />
}
