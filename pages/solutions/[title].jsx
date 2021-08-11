import { useRouter } from "next/dist/client/router"
import React from "react"

export default function Solution() {
  const router = useRouter()

  const { title } = router.query

  return <div>{title}</div>
}
