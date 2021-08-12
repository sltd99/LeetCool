import axios from "axios";
import React, { useEffect, useState } from "react"

export default function performance() {
  const [test, setTest] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get('/api/questions')
      setTest(data.question);
    }
    fetch();
  }, [])


  return <div>
    {test && <>
      <p>{ test.questionTitle}</p>
    <p>{test.diff}</p>
    {test.questionContentHTML}
    <p>{ test.tags}</p></>}
  </div>
}
