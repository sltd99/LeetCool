import React, { useState } from "react"
import axios from "axios"
import Autosuggest from "react-autosuggest"

const languages = [
  {
    name: "C",
    year: 1972,
  },
  {
    name: "Elm",
    year: 2012,
  },
]

export default function upload() {
  const [value, setValue] = useState("")
  const [suggestions, setSuggestions] = useState([])

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : languages.filter(lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue)
  }

  const onSuggestionsFetchRequested = ({ value }) => setSuggestions(getSuggestions(value))
  const onSuggestionsClearRequested = () => setSuggestions([])

  const getSuggestionValue = suggestion => suggestion.name

  const inputProps = {
    placeholder: "Type a programming language",
    value,
    onChange: e => setValue(e.target.value),
  }

  const renderSuggestion = suggestion => (
    <div onClick={() => setValue(suggestion.name)} className="bg-gray-50 shadow">
      {suggestion.name}
    </div>
  )

  return <div></div>
}
