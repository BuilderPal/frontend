import React, { useState, useEffect } from 'react'
import Chat from '../../components/recommendation/chat/Chat'
import SearchResults from '../../components/recommendation/result/SearchResults'
import { ClipLoader } from 'react-spinners'
import { useParams } from 'react-router-dom'

const Recommendation = () => {
  const { id: recommendationChatId } = useParams()
  const [currIterationIndex, setCurrIterationIndex] = useState(0)
  useEffect(() => {
    setCurrIterationIndex(0)
  }, [recommendationChatId])
  return (
    recommendationChatId == null
      ? <ClipLoader isLoading={recommendationChatId == null} />
      : (
      <div className="flex h-screen">
        <Chat recommendationChatId={recommendationChatId} setCurrIterationIndex={setCurrIterationIndex}/>
        <SearchResults recommendationChatId={recommendationChatId} currIterationIndex={currIterationIndex}/>
      </div>
        )
  )
}

export default Recommendation
