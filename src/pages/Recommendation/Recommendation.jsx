import React, { useEffect, useState } from 'react'
import Chat from '../../components/recommendation/chat/Chat'
import SearchResults from '../../components/recommendation/result/SearchResults'
import { ClipLoader } from 'react-spinners'
import { API } from '../../lib/utils'

const Recommendation = () => {
  const [recommendationChatId, setRecommendationChatId] = useState(null)
  const fetchChatId = async () => {
    const { data: { chat_id: createdChatId } } = await API.createDiscoveryChat()
    setRecommendationChatId(createdChatId)
  }
  useEffect(() => {
    fetchChatId()
  }, [])
  return (
    recommendationChatId == null
      ? <ClipLoader isLoading={recommendationChatId == null} />
      : (
      <div className="flex h-screen">
        <Chat recommendationChatId={recommendationChatId} />
        <SearchResults recommendationChatId={recommendationChatId} />
      </div>
        )
  )
}

export default Recommendation
