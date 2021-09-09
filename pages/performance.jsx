import React from "react";
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
        Header: "User Icon",
        accessor: "user_image_url",
        Cell: ({ value }) => (
          <div className="flex space-x-3">
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500">
              {value && <img className="rounded-full" src={value} alt="" />}
            </span>
          </div>
        ),
      },
      {
        Header: "User Email",
        accessor: "user_email",
      },
      {
        Header: "Total Amount",
        accessor: "total_question_amount",
      },
      {
        Header: "Last Login Time",
        accessor: "last_login",
      },
    ],

    []
  );
  const data = useMemo(
    () =>
      rawData.map(
        ({
          total_question_amount,
          user_email,
          user_name,
          _id,
          last_login,
          user_image_url,
        }) => ({
          total_question_amount: total_question_amount,
          user_email: user_email,
          user_name: user_name,
          user_id: _id,
          last_login: last_login.split("T")[0],
          user_image_url: user_image_url,
        })
      ),
    [rawData]
  );
  return <Table data={data} columns={columns} showSearch={false} />;
}
