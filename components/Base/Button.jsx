import React from "react"

export default function Button({ Icon, onClick, children, ...rest }) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 "
    >
      {Icon && <Icon className="-ml-1 mr-2 h-5 w-5" />}
      {children}
    </button>
  )
}
