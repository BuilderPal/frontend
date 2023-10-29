import React from 'react'
import { Badge } from 'components/ui/badge'
import { faClock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import project from 'assets/project/project-sample.png'
import InstructionPreview from 'components/guidance/project/InstructionPreview'
import ResourcePreview from 'components/guidance/project/ResourcePreview'
import { capitalise } from 'lib/utils'

const Details = ({ title, description, complexity, durationInMinutes, resources, instructions, instructionIndex, setInstructionIndex }) => {
  return (
    <div className='text-white w-full overflow-y-auto mb-4'>
      <img src={project} alt='project' className='mx-auto max-w-xl' />

      <h2 className='font-bold text-white text-2xl mb-2 mt-6'>{title}</h2>
      <p className='mb-2'>{description}</p>
      <Badge variant={complexity}><FontAwesomeIcon icon={faUser} />&nbsp;Difficulty: {capitalise(complexity)}</Badge>
      &nbsp;
      <Badge variant='secondary'><FontAwesomeIcon icon={faClock} />&nbsp;Estimated Time: {durationInMinutes}min</Badge>

      <h2 className='font-bold text-white text-2xl mb-2 mt-6'>Materials Needed</h2>
      <div className='grid gap-4'>
        {resources.map((resource, i) =>
          <ResourcePreview
            key={i}
            resource={resource}
          />
        )}
      </div>

      <h2 className='font-bold text-white text-2xl mb-2 mt-6'>Instructions</h2>
      <div className='grid gap-4'>
        {instructions.map((instruction, i) =>
          <InstructionPreview
            key={i}
            instruction={instruction}
            instructionIndex={instructionIndex}
            setInstructionIndex={setInstructionIndex}
          />
        )}
      </div>
    </div>
  )
}

export default Details
