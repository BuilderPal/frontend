import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs'
import { Separator } from 'components/ui/separator'
import Details from '../../components/guidance/project/Details'
import Instruction from '../../components/guidance/project/Instruction'
import Chat from '../../components/guidance/chat/Chat'
import { API } from '../../lib/utils'
import ClipLoader from 'react-spinners/ClipLoader'
import { BiArrowBack } from 'react-icons/bi'
import { AiOutlineCheck } from 'react-icons/ai'
import React, { useState, useEffect } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { Button } from 'components/ui/button'
import GuidanceChat from 'components/guidance/chat2/GuidanceChat'
const Guidance = () => {
  const { id: userProjectId } = useParams()
  const { userProject: userProjectLoaded, guidanceChatId } = useLoaderData()
  const [userProject, setUserProject] = useState(userProjectLoaded)
  const navigateInstruction = async (target) => {
    const { data: updatedProject } = await API.updateCurrentInstructionIndex(userProjectId, target)
    console.log('navigateInstruction', updatedProject)
    setUserProject(processUserProject(updatedProject))
  }
  const instructionIndex = userProject.current_instruction_index
  const isViewingInstructions = instructionIndex >= 0
  const navigate = useNavigate()
  console.log(userProject)
  return (
    <div className='flex flex-col w-full min-h-screen'>
      <div className='flex space-x-5 p-3 items-center'>
        <>
          <button className="w-10 h-10 pl-1" onClick={() => navigate(-2)}><BiArrowBack /></button>
          <h1 className='text-4xl'>BuilderPal</h1>
        </>
      </div>
      <Separator className='mb-2' />
      {isViewingInstructions
        ? <Instruction
                instructions={userProject.instructions}
                instructionIndex={instructionIndex}
                setInstructionIndex={navigateInstruction}
                guidanceChatId={guidanceChatId}
                userProjectId={userProjectId}
              />
        : <Details
                {...userProject}
                instructionIndex={instructionIndex}
                setInstructionIndex={navigateInstruction}
                userProjectId={userProjectId}
              />}
      {/* {isViewingInstructions ? <GuidanceChat guidanceChatId={guidanceChatId} userProjectId={userProjectId}/> : <></>} */}
    </div>
  )
}

const processUserProject = (project) => {
  return {
    title: project.title,
    current_instruction_index: project.current_instruction_index,
    duration_in_minutes: project.duration_in_minutes,
    complexity: project.complexity,
    resources: project.resources,
    categories: project.categories,
    description: project.description,
    instructions: project.instructions.map(instruction => ({
      instruction_index: instruction.instruction_index,
      title: instruction.title,
      body: instruction.content,
      images: instruction.media_items
        .filter(media => media.media_type === 'image')
        .map(media => media.url),
      downloads: instruction.downloads
    })),
    image: project.image
  }
}

export const userProjectLoader = async ({ params: { id } }) => {
  const { data: project } = await API.getUserProject(id)
  const { data: { chat_id: guidanceChatId } } = await API.createGuidanceChat(id)
  return { userProject: processUserProject(project), guidanceChatId }
}

export default Guidance
