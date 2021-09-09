import React, { useState } from "react";
import { useQuery, QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import Select from "react-select";
import Title from "@/components/Question/Title";
import Tags from "@/components/Question/Tags";
import Description from "@/components/Question/Description";
import Mardown from "@/components/Question/Markdown";
import { useAxios } from "hooks";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    overflowX: "hidden",
    overflowY: "hidden",
  },
  grid: {
    height: "90vh",
    overflowY: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 10px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
}));

const axios = useAxios();

const fetchAllQuestions = async () => {
  const { data } = await axios.get("/questions");

  return data.questions.map(
    ({ question_id, question_title, question_difficulty }) => ({
      value: question_id,
      label: question_id + ". " + question_title,
    })
  );
};

const fetchSelectedQuestion = async (questionId, user_id) => {
  const { data } = await axios.post("/questions/" + questionId, { user_id });
  return data;
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("allQuestions", fetchAllQuestions);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function upload({ session }) {
  const classes = useStyles();
  const { data } = useQuery("allQuestions", fetchAllQuestions);
  const [questionId, setQuestionId] = useState(null);
  const {
    data: {
      question_title,
      question_difficulty,
      question_tags,
      question_content,
      question_answer,
    } = {},
    isLoading,
  } = useQuery(
    ["selectedQuestion", questionId],
    () => fetchSelectedQuestion(questionId, session.user_id),
    {
      enabled: !!questionId,
    }
  );

  return (
    <>
      <div className="flex flex-col items-center mt-5 mb-10 space-y-3">
        <Select
          instanceId="react-select"
          className="w-[40rem]"
          options={data}
          onChange={(question) => setQuestionId(question.value)}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#667eea",
              primary75: "#7f9cf5",
              primary50: "#c3dafe",
              primary25: "#c3dafe",
            },
          })}
        />
      </div>
      <Grid container className={classes.root} spacing={1}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <div className={classes.grid} style={{ margin: "5vh" }}>
              {questionId && !isLoading && (
                <>
                  <Title difficulty={question_difficulty}>
                    {questionId}. {question_title}
                  </Title>

                  <Tags tags={question_tags} />

                  <Description>{question_content}</Description>
                </>
              )}
            </div>
          </Grid>

          <Grid item xs={6}>
            {questionId && (
              <div className={classes.grid} style={{ margin: "5vh" }}>
                <Mardown
                  editable
                  questionId={questionId}
                  user_id={session.user_id}
                >
                  {question_answer}
                </Mardown>
              </div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
