import Loader from 'components/ui/loader'
import React, { useState, useEffect } from 'react'
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom'

export default function RecommendationBase () {
  const [hasLoading, setHasLoading] = useState(false)
  const [recommendationChatId, setRecommendationChatId] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const recommendationChatIdLS = localStorage.getItem('recommendationChatId')
    console.log('Retrieved chat_id from local storage', recommendationChatIdLS)
    setRecommendationChatId(recommendationChatIdLS, () => setHasLoading(true))
    navigate(recommendationChatIdLS ? `/${recommendationChatIdLS}` : '/landing')
  }, [])
  return (hasLoading
    ? (
    <div className="builderpal">

      <Loader/>
    </div>
      )
    : < Navigate to = {recommendationChatId ? `/${recommendationChatId}` : '/landing'} />)
}
