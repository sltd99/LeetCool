import React from "react"
import Chip from "@/components/Base/Chip"

export default function Title({ children = "1. Two Sum", difficulty = "Easy" }) {
  return (
    <div className="font-semibold text-3xl text-gray-900">
      <span>{children}</span>
      <Chip className="ml-3 -translate-y-1">{difficulty}</Chip>
    </div>
  )
}
