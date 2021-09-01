import React, { useEffect, useState } from "react";
import Table from "../components/Base/Table";
import { useQuery, QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useMemo } from "react";
import { useAxios } from "hooks";

const axios = useAxios();

const fetchUsers = async () => {
  const { data } = await axios.get("/users/performance");
  return data;
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("users", fetchUsers);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function performance() {
  const { data: rawData } = useQuery("users", fetchUsers);
  const columns = useMemo(
    () => [
      {
        Header: "User Name",
        accessor: "user_name", // accessor is the "key" in the data
      },
      {
        Header: "User Email",
        accessor: "user_email",
      },
      {
        Header: "Total Amount",
        accessor: "total_question_amount",
      },
    ],

    []
  );
  const data = useMemo(
    () =>
      rawData.map(({ total_question_amount, user_email, user_name, _id}) => ({
        total_question_amount: total_question_amount,
        user_email: user_email,
        user_name: user_name,
        user_id: _id
      })),
    [rawData]
  );
  return <Table data={data} columns={columns} showSearch={ false}/>;
}
