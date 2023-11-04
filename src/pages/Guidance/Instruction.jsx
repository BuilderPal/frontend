import React from 'react'
import InstructionParagraph from 'components/guidance/project/InstructionParagraph'
import ImageCarousel from 'components/guidance/project/ImageCarousel'
import InstructionPreview from '../../components/guidance/project/InstructionPreview'
import { Button } from 'components/ui/button'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
const Instruction = ({ navigatePrev, instructions, instructionIndex, setInstructionIndex }) => {
  const instruction = instructions[instructionIndex]
  return (
    <>
    <div className="fixed inset-x-0 bottom-0 px-4 py-2 flex justify-between z-10">
        {instructionIndex > 0
          ? <Button className={'bg-blue-600 text-2xl py-7'} onClick={() => setInstructionIndex(instructionIndex - 1)}>
            <IoIosArrowBack className='mr-1' /> Previous Step
          </Button>
          : <Button className={'bg-blue-600 text-2xl py-7'} onClick={() => navigatePrev()}>
          <IoIosArrowBack className='mr-1' /> Project Details
        </Button>}
        {instructionIndex + 1 < instructions.length
          ? <Button className="bg-blue-600 text-2xl py-7" onClick={() => setInstructionIndex(instructionIndex + 1)}>
            Next Step <IoIosArrowForward className='ml-1' />
          </Button>
          : <div> </div>}

      </div>
      <div className='flex flex-row mb-10 h-full space-x-10'>
        <div className='w-1/2 h-full overflow-y-auto'>
          <div className='mb-6 mt-6'>
            <InstructionPreview
              instruction={instruction}
              isIdle={true} />
          </div>

          {instruction.body.map((paragraph, i) =>
            <InstructionParagraph key={i} paragraph={paragraph} />
          )}
        </div>
        <div className='w-1/2 h-full'>
          {instruction.images.length > 0 && <>
            <ImageCarousel images={instruction.images} />
          </>}
        </div>

      </div>

      {/* <div className='flex place-content-between'>
        {instructionIndex > 0 ? <Button variant='secondary' onClick={() => setInstructionIndex(instructionIndex - 1)}>Previous Step</Button> : <></>}
        {instructionIndex + 1 < instructions.length ? <Button variant='accent' onClick={() => setInstructionIndex(instructionIndex + 1)}>Next Step</Button> : <></>}
      </div> */}
    </>
  )
}

export default Instruction
