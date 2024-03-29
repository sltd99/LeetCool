import Table from "../components/Base/Table";
import { useQuery, QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useMemo } from "react";
import { useAxios } from "hooks";
import Chip from "@material-ui/core/Chip";
import Difficulty from "@/components/Base/Chip";

const axios = useAxios();

const fetchQuestions = async () => {
  const { data } = await axios.get("/questions", {
    params: { question_is_answered: true },
  });
  return data;
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("questions", fetchQuestions);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Home() {
  const { data: rawData } = useQuery("questions", fetchQuestions);
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title", // accessor is the "key" in the data
      },
      {
        Header: "Difficulty",
        accessor: "difficulty",
        Cell: ({ value }) => (
          <div>
            <Difficulty>{value}</Difficulty>
          </div>
        ),
      },
      {
        Header: "Tags",
        accessor: "tags",
        Cell: ({ value }) => (
          <div className="flex space-x-1">
            {value.map((tag, id) => (
              <Chip label={tag.name} key={id} variant="outlined" />
            ))}
          </div>
        ),
      },
      {
        Header: "Solutions",
        accessor: "solutions",
        Cell: ({ value }) => (
          <div className="flex space-x-3">
            {value.map((user) => (
              <span
                key={user.name}
                className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500"
              >
                {user.url == null ? (
                  <span className="text-xs font-medium leading-none text-white">
                    {user.name[0]}
                  </span>
                ) : (
                  <img className="rounded-full" src={user.url} alt="" />
                )}
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
  );

  const data = useMemo(() => {
    const { daily } = rawData;
    return [
      {
        questionId: daily.question.question_id,
        title:
          daily.question.question_id + ". " + daily.question.question_title,
        difficulty: daily.question.question_difficulty,
        tags: daily.question.question_tags.map((tag) => {
          return {
            name: tag,
          };
        }),
        solutions: daily.users.map((user) => {
          return {
            url: user.user_image_url,
            name: user.user_name,
          };
        }),
        lastSubmitted: daily.question.question_last_submit_date.split("T")[0],
      },
    ].concat(
      rawData.questions.map(
        ({
          question_id,
          question_tags,
          question_title,
          question_difficulty,
          question_answers,
          question_last_submit_date,
        }) => ({
          questionId: question_id,
          title: question_id + ". " + question_title,
          difficulty: question_difficulty,
          tags: question_tags.map((tag) => {
            return {
              name: tag,
            };
          }),
          solutions: question_answers.map((user) => {
            if (user.user != null) {
              return {
                url: user.user.user_image_url,
                name: user.user.user_name,
              };
            } else {
              return {
                url: "",
                name: "unkonw",
              };
            }
          }),
          lastSubmitted: question_last_submit_date.split("T")[0],
        })
      )
    );
  }, [rawData]);

  return (
    <div>
      <Table data={data} columns={columns} />
    </div>
  );
}
