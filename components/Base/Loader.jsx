import React from "react"

export default function Loader() {
  return (
    <div className="border border-indigo-300 shadow rounded-md p-4 w-full mx-auto">
      {[1, 2, 3, 4, 5].map(n => (
        <div key={n} className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-indigo-400 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-indigo-400 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-indigo-400 rounded"></div>
              <div className="h-4 bg-indigo-400 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
