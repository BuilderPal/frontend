import { API } from 'lib/utils'
import React from 'react'
import { Navigate, useLoaderData } from 'react-router-dom'

export default function RecommendationBase () {
  const recommendationChatId = useLoaderData()
  return <Navigate to={`/${recommendationChatId}`} />
}

export const recommendationChatIdLoader = async () => {
  const { data: { user_project_id: userProjectId } } = await API.createDiscoveryChat()
  return userProjectId
}
