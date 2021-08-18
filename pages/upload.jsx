import React, { useState, useEffect } from "react"
import axios from "axios"
import { useQuery, QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"

import AsyncSelect from "react-select/async"
import Title from "@/components/Question/Title"
import Tags from "@/components/Question/Tags"
import Description from "@/components/Question/Description"
import Solutions from "@/components/Question/Solutions"
import Comments from "@/components/Question/Comments"
import Mardown from "@/components/Question/Markdown"

const url = process.env.BACKENDURL

// const fetchQuestion = async () => {
//   const { data } = await axios(url + "/playwright")

//   return data
// }

const fetchTodo = async () => {
  const { data } = await axios(
    "https://jsonplaceholder.typicode.com/todos/" + Math.floor(Math.random() * 199 + 1)
  )

  return data
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery("todo", fetchTodo)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const customStyles = {
  control: (styles, state) => ({
    // ...provided,

    // "&:hover": {
    //   borderColor: "#667eea",
    // },

    ...styles,
    "&:hover": {
      borderColor: "black",
    },

    boxShadow: state.isFocused ? "0 0 0 1px #667eea" : 0,
    borderColor: state.isFocused ? "#667eea" : "black",
  }),
}

export default function upload() {
  // const { data, refetch } = useQuery("todo", fetchTodo)

  const loadOptions = async inputValue => {
    await sleep(300)

    return [
      { value: "two-sum", label: "1. Two Sum" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" },
    ].filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()))
  }

  return (
    <div className="flex flex-col items-center mt-5 space-y-3">
      <AsyncSelect
        instanceId="react-select"
        className="w-80"
        cacheOptions
        loadOptions={loadOptions}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#667eea",
          },
        })}
      />

      <Title>1. Two Sum</Title>

      <Tags tags={["Array", "Recursion"]} />

      <Description>
        {`<div><p>Given an array of strings <code>strs</code>, group <strong>the anagrams</strong> together. You can return the answer in <strong>any order</strong>.</p >

<p>An <strong>Anagram</strong> is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.</p >

<p>&nbsp;</p >
<p><strong>Example 1:</strong></p >
<pre><strong>Input:</strong> strs = ["eat","tea","tan","ate","nat","bat"]
<strong>Output:</strong> [["bat"],["nat","tan"],["ate","eat","tea"]]
</pre><p><strong>Example 2:</strong></p >
<pre><strong>Input:</strong> strs = [""]
<strong>Output:</strong> [[""]]
</pre><p><strong>Example 3:</strong></p >
<pre><strong>Input:</strong> strs = ["a"]
<strong>Output:</strong> [["a"]]
</pre>
<p>&nbsp;</p >
<p><strong>Constraints:</strong></p >

<ul>
        <li><code >1 &lt;= strs.length &lt;= 10<sup>4</sup></code></li>
        <li><code>0 &lt;= strs[i].length &lt;= 100</code></li>
        <li><code>strs[i]</code> consists of lower-case English letters.</li>
</ul>
</div>`}
      </Description>

      <div className="min-h-[30rem] w-[40rem]">
        <Mardown editable />
      </div>
    </div>
  )
}
