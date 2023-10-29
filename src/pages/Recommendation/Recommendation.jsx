import React, { useEffect, useState } from 'react'
import Chat from '../../components/recommendation/chat/Chat'
import SearchResults from '../../components/recommendation/result/SearchResults'
import { ClipLoader } from 'react-spinners'
import { API } from '../../lib/utils'

const Recommendation = () => {
  const [recommendationChatId, setRecommendationChatId] = useState(null)
  const [currIterationIndex, setCurrIterationIndex] = useState(null)
  const fetchChatId = async () => {
    const { data: { chat_id: createdChatId } } = await API.createDiscoveryChat()
    setRecommendationChatId(createdChatId)
    setCurrIterationIndex(0)
  }
  useEffect(() => {
    fetchChatId()
  }, [])
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
