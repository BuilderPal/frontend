import React from 'react'
import InstructionParagraph from 'components/guidance/InstructionParagraph'
import ImageCarousel from 'components/guidance/ImageCarousel'
import InstructionPreview from '../../components/guidance/InstructionPreview'
import { Button } from 'components/ui/button'

const Instruction = ({ instructions, instructionIndex, setInstructionIndex }) => {
  const instruction = instructions[instructionIndex]
  return (
    <div className='text-white w-full mb-10 overflow-y-auto'>
      <div className='mb-6 mt-6'>
        <InstructionPreview
          instruction={instruction}
          isIdle={true}/>
      </div>
      <div className='flex place-content-between'>
        {instructionIndex > 0 ? <Button variant='secondary' onClick={() => setInstructionIndex(instructionIndex - 1)}>Previous Step</Button> : <></>}
        {instructionIndex + 1 < instructions.length ? <Button variant='accent' onClick={() => setInstructionIndex(instructionIndex + 1)}>Next Step</Button> : <></>}
      </div>

      <h2 className='text-2xl my-auto font-bold mb-2 mt-6'>Instructions</h2>
      {instruction.body.map((paragraph, i) =>
        <InstructionParagraph key={i} paragraph={paragraph}/>
      )}

      <h2 className='text-2xl my-auto font-bold mb-2 mt-6'>Images</h2>
      <ImageCarousel images={instruction.images}/>
    </div>
  )
}

export default Instruction
