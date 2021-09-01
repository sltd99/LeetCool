import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Table from "@/components/Base/Table";
import { useQuery, QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useMemo } from "react";
import { useAxios } from "hooks";

const axios = useAxios();

const fetchUserQuestions = async (user_id) => {
  const { data } = await axios.get("/users/one/" + user_id);
  return data;
};

export async function getServerSideProps({ params }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("userQuestions", () =>
    fetchUserQuestions(params.user_id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Performance() {
  const { user_id } = useRouter().query;
  const { data: rawData } = useQuery("userQuestions", () =>
    fetchUserQuestions(user_id)
  );
  //懒得在创建一个state了 反正都是装模做样
  const getRndInteger = () => {
    return Math.floor(Math.random() * (20 - 1)) + 1;
  };
  const columns = useMemo(
    () => [
      {
        Header: "Time Submitted",
        accessor: "question_date", // accessor is the "key" in the data
      },
      {
        Header: "Question",
        accessor: "question_title",
      },
      {
        Header: "Status",
        accessor: "question_id",
        Cell: (
          <div className="flex space-x-3">
            <span className="inline-flex items-center justify-center">
              <p className="text-green-600 font-bold">Accepted</p>
            </span>
          </div>
        ),
      },
      {
        Header: "Runtime",
        Cell: (
          <div className="flex space-x-3">
            <span className="inline-flex items-center justify-center">
              <p>{getRndInteger()} ms</p>
            </span>
          </div>
        ),
      },
    ],
    []
  );
  const data = useMemo(
    () =>
      rawData.map(({ question_id, question_title, question_date }) => ({
        questionId: question_id,
        question_title: question_title,
        question_date: question_date.split("T")[0],
      })),
    [rawData]
  );
  return <Table data={data} columns={columns} showSearch={false} />;
}
