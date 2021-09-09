import { useRouter } from "next/dist/client/router";
import React from "react";
import Title from "@/components/Question/Title";
import Tags from "@/components/Question/Tags";
import Description from "@/components/Question/Description";
import Solutions from "@/components/Question/Solutions";
import { useQuery, QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
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
const fetchQuestion = async (questionId) => {
  const { data } = await axios.post("/questions/" + questionId);
  return data;
};

export async function getServerSideProps({ params }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("question", () =>
    fetchQuestion(params.question_id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Solution() {
  const { question_id } = useRouter().query;
  const classes = useStyles();

  const {
    data: {
      question_title,
      question_difficulty,
      question_tags,
      question_content,
      question_answers,
      question_url,
    },
  } = useQuery("question", () => fetchQuestion(question_id));

  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <div className={classes.grid} style={{ margin: "5vh" }}>
            <Title difficulty={question_difficulty}>
              <a href={question_url}>
                {question_id}. {question_title}
              </a>
            </Title>
            <Tags tags={question_tags} />
            <Description>{question_content}</Description>
          </div>
        </Grid>

        <Grid item xs={6}>
          <div className={classes.grid} style={{ margin: "5vh" }}>
            {question_answers.map((qa) => (
              <Solutions key={qa._id} user={qa.user.user_name}>
                {qa.question_answer}
              </Solutions>
            ))}
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

{
  /* <div className="grid grid-cols-2 m-5 gap-2 ">
      <div className="col flex-col overflow-scroll overflow-x-hidden h-90v ">
        <Title difficulty={question_difficulty}>
          <a href={question_url}>
            {question_id}. {question_title}
          </a>
        </Title>
        <Tags tags={question_tags} />
        <Description>{question_content}</Description>
      </div>
      <div className="col flex-col overflow-scroll overflow-x-hidden max-h-screen space-y-5 min-h-[30rem]">
        {question_answers.map((qa) => (
          <Solutions key={qa._id} user={qa.user.user_name}>
            {qa.question_answer}
          </Solutions>
        ))}
      </div>
    </div> */
}
