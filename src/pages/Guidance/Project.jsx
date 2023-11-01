import { API } from 'lib/utils'
import React from 'react'
import { Navigate, useLoaderData } from 'react-router-dom'

export default function Project () {
  const userProjectId = useLoaderData()
  return <Navigate to={`/user_project/${userProjectId}`} />
}

export const userProjectIdLoader = async ({ params: { id } }) => {
  const { data: { user_project_id: userProjectId } } = await API.createUserProject(id)
  return userProjectId
}
