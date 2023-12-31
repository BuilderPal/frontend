import React from 'react'
import { Button } from 'components/ui/button'

const Suggestion = ({ suggestion, sendSuggestion }) => {
  return <Button onClick={() => sendSuggestion(suggestion.description)} className=" bg-blue-950 w-full text-white p-7 my-2 font-semibold text-lg">{suggestion.title}</Button>
}

export default Suggestion
