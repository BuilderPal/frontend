import React from 'react'
import { Badge } from 'components/ui/badge'
import { faClock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import project from 'assets/project/project-sample.png'
import InstructionPreview from 'components/guidance/project/InstructionPreview'
import ResourcePreview from 'components/guidance/project/ResourcePreview'
import { capitalise } from 'lib/utils'
import ImageCarousel from 'components/guidance/project/ImageCarousel'

const Details = ({ title, description, complexity, duration_in_minutes: duration, resources, instructions, instructionIndex, setInstructionIndex, image }) => {
  console.log(image)
  return (
    <div className='flex flex-row mb-10 h-full space-x-10'>

      <div className='w-1/2 h-full '>
        <h2 className='font-bold text-2xl mb-2 mt-6'>{title}</h2>
        <p className='mb-2'>{description}</p>
        <Badge variant={complexity}><FontAwesomeIcon icon={faUser} />&nbsp;Difficulty: {capitalise(complexity)}</Badge>
        &nbsp;
        <Badge variant='secondary'><FontAwesomeIcon icon={faClock} />&nbsp;Estimated Time: {duration} min</Badge>

        <h2 className='font-bold text-2xl mb-2 mt-6'>Materials Needed</h2>
        <div className='grid gap-4'>
          {resources.map((resource, i) =>
            <ResourcePreview
              key={i}
              resource={resource}
            />
          )}
        </div></div>
      <div className='w-1/2 h-full'>
            <ImageCarousel images={[image]} />
      </div>

      {/*
      <h2 className='font-bold text-2xl mb-2 mt-6'>Instructions</h2>
      <div className='grid gap-4'>
        {instructions.map((instruction, i) =>
          <InstructionPreview
            key={i}
            instruction={instruction}
            instructionIndex={instructionIndex}
            setInstructionIndex={setInstructionIndex}
          />
        )}
      </div> */}
    </div>

  )
}

export default Details
