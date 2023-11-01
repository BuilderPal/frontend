import { API } from 'lib/utils'
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

export default function DynamicProject () {
  const { state: metadata } = useLocation()
  const [userProjectId, setUserProjectId] = useState(null)
  const fetchDynamicSearchResults = async (metadata) => {
    // const { data: project } = await API.getFilledDynamicProject(metadata)
    const { data: { user_project_id: userProjectIdFetched } } = await API.createDynamicUserProject('6541e7c2c52ca85608473c9a')
    setUserProjectId(userProjectIdFetched)
  }
  useEffect(() => {
    console.log('inside DynamicProject')
    console.log(metadata)
    fetchDynamicSearchResults(metadata)
    // const { data: project } = await API.getFilledDynamicProject(metadata)
    // const { data: { user_project_id: userProjectIdFetched } } = await API.getUserProject(project.project_id)
    // setUserProjectId(userProjectIdFetched)
  }, [metadata])
  return (
    userProjectId == null
      ? <ClipLoader isLoading={userProjectId == null} />
      : (
        <Navigate to={`/user_project/${userProjectId}`} />
        )
  )
}
