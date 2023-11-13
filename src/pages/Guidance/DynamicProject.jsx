import Loader from 'components/ui/loader'
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
  const messages = [
    "Hold your horses! We're building something awesome for you. It'll take just about 45 fun-filled seconds!",
    'Gathering magic dust and unicorn sparkles... Your amazing project will be ready in 45 giggly seconds!',
    'Hang tight! Our friendly robots are drawing, cutting, and gluing your project. T-minus 45 playful seconds!',
    "Brace for fun! We're on a 45-second mission to create something super cool just for you!",
    "Ready for a surprise? We're baking your project in our idea oven, and it'll rise in 45 giggly-seconds!"
  ]
  return (userProjectId == null
    ? (
    <div className="builderpal"><Loader messages={messages}/></div>
      )
    : <Navigate to={`/user_project/${userProjectId}`} />)
}
