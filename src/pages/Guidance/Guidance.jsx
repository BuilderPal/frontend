import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs'
import { Separator } from 'components/ui/separator'
import Details from './Details'
import Instruction from './Instruction'
import Chat from '../../components/guidance/chat/Chat'
import { API } from '../../lib/utils'
import ClipLoader from 'react-spinners/ClipLoader'
import { BiArrowBack } from 'react-icons/bi'

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
  const userProjectLoaded = useLoaderData()
  const [userProject, setUserProject] = useState(userProjectLoaded)
  const [instructionIndex, setInstructionIndex] = useState(0)
  const [isLoadingProject, setIsLoadingProject] = useState(false)
  const [isViewingInstructions, setIsViewingInstructions] = useState(false)
  const navigate = useNavigate()
  console.log(userProject)
  return (
      <main className='w-full h-full'>
        <Tabs defaultValue='details' className='p-4 h-full'>
          <menu className='grid content-center'>
            <div className='flex space-x-5'>
              <>
              <Button variant="outline" onClick={() => navigate(-2)}><BiArrowBack/></Button>
              <h1 className='text-4xl'>BuilderPal</h1>
              </>
            </div>
          </menu>
          <Separator className='my-2' />
          <section className='h-[90%] overflow-y-auto'>
            {
              isLoadingProject
                ? <ClipLoader
                  loading={isLoadingProject}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                : (
                  <>
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
                        navigateNext = {() => setIsViewingInstructions(true)}

                      />
                      }
                  </>
                  )
            }
          </section>
        </Tabs>
      </main>
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
        .map(media => media.url)
    })),
    image: project.image
  }
  return userProject
}

export default Guidance
