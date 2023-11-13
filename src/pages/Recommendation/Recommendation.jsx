import React, { useState, useEffect } from 'react'
import Chat from '../../components/recommendation/chat/Chat'
import SearchResults from '../../components/recommendation/result/SearchResults'
import { ClipLoader } from 'react-spinners'
import { useParams } from 'react-router-dom'

const Recommendation = () => {
  const { id: recommendationChatId } = useParams()
  const [currIterationIndex, setCurrIterationIndex] = useState(0)
  const [shouldShowResults, setShouldShowResults] = useState(false)
  useEffect(() => {
    setCurrIterationIndex(0)
  }, [recommendationChatId])
  return (
    recommendationChatId == null
      ? <ClipLoader isLoading={recommendationChatId == null} />
      : (
      <div className="flex h-screen">
        <Chat recommendationChatId={recommendationChatId} setCurrIterationIndex={setCurrIterationIndex} setShouldShowResults={setShouldShowResults} shouldShowResults={shouldShowResults}/>
        <SearchResults recommendationChatId={recommendationChatId} currIterationIndex={currIterationIndex} shouldShowResults={shouldShowResults}/>
      </div>
        )
  )
}

export default Recommendation
