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
const templateUserProject = {
  title: 'Sample Project Title',
  duration_in_minutes: 60,
  complexity: 'high',
  resources: ['Resource A', 'Resource B'],
  categories: ['Category A', 'Category B'],
  description: 'This is a description of the sample project.',
  instructions: [
    {
      instruction_index: 0,
      title: 'Start with a Diamond',
      body: [
        'First, begin with a diamond piece of copy paper',
        'I have outlined the edges of my paper in blue to make it easier.',
        '(TO MAKE A SQUARE: You can make a square from a rectangular piece.)',
        'I usually make two snowflakes for every 8.5"x11" piece of paper.'
      ],
      images: [
        'https://content.instructables.com/FY2/WTVT/KFWJO05V/FY2WTVTKFWJO05V.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=0889d7a436a4385d133da7232be78fe9',
        'https://content.instructables.com/FA5/85WW/KFQTVHPK/FA585WWKFQTVHPK.jpg?auto=webp&frame=1&fit=bounds&md=b311f18cf945ecf2ba6602a84449b86a'
      ]
    },
    {
      instruction_index: 1,
      title: 'Start with a Square',
      body: [
        'First, begin with a square piece of copy paper',
        'I have outlined the edges of my paper in blue to make it easier.',
        '(TO MAKE A SQUARE: You can make a square from a rectangular piece.)',
        'I usually make two snowflakes for every 8.5"x11" piece of paper.'
      ],
      images: [
        'https://content.instructables.com/FY2/WTVT/KFWJO05V/FY2WTVTKFWJO05V.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=0889d7a436a4385d133da7232be78fe9'
      ]
    },
    {
      instruction_index: 2,
      title: 'Start with a Circle',
      body: [
        'First, begin with a circle piece of copy paper',
        'I have outlined the edges of my paper in blue to make it easier.',
        '(TO MAKE A SQUARE: You can make a square from a rectangular piece.)',
        'I usually make two snowflakes for every 8.5"x11" piece of paper.'
      ],
      images: [
        'https://content.instructables.com/FY2/WTVT/KFWJO05V/FY2WTVTKFWJO05V.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=0889d7a436a4385d133da7232be78fe9'
      ]
    }
  ]
}

const Guidance = () => {
  const { id: userProjectid } = useParams()
  const userProjectLoaded = useLoaderData()
  const [userProject, setUserProject] = useState(userProjectLoaded)
  const [instructionIndex, setInstructionIndex] = useState(0)
  const [isLoadingProject, setIsLoadingProject] = useState(false)
  const [isViewingInstructions, setIsViewingInstructions] = useState(false)

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
                setInstructionIndex={setInstructionIndex}
                navigatePrev={() => setIsViewingInstructions(false)}
              />
        : <Details
                {...userProject}
                instructionIndex={instructionIndex}
                setInstructionIndex={setInstructionIndex}
                navigateNext={() => setIsViewingInstructions(true)}
                userProjectId={userProjectid}
              />}

    </div>
  )
}

export const userProjectLoader = async ({ params: { id } }) => {
  const { data: project } = await API.getUserProject(id)
  const userProject = {
    title: project.title,
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
  return userProject
}

export default Guidance
