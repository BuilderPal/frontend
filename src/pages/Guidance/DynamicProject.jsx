import { API } from 'lib/utils'
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

export default function DynamicProject () {
  const { id: metadataId } = useParams()
  const [userProjectId, setUserProjectId] = useState(null)
  const fetchAndSetUserProjectId = async (metadataId) => {
    if (metadataId == null) {
      return
    }
    const { data: { project_id: projectId } } = await API.getFilledDynamicProject(metadataId)
    console.log('Created dynamic project', projectId)
    const { data: { user_project_id: userProjectId } } = await API.createDynamicUserProject(projectId)
    console.log('Created dynamic user project', userProjectId)
    setUserProjectId(userProjectId)
  }
  useEffect(() => {
    fetchAndSetUserProjectId(metadataId)
  }, [metadataId])
  return (userProjectId == null ? <ClipLoader isLoading={userProjectId == null} /> : <Navigate to={`/user_project/${userProjectId}`} />)
}
