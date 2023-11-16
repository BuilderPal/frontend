import React from 'react'
import InstructionParagraph from 'components/guidance/project/InstructionParagraph'
import ImageCarousel from 'components/guidance/project/ImageCarousel'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import GuidanceChat from '../chat2/GuidanceChat'
const Instruction = ({ instructions, instructionIndex, setInstructionIndex, guidanceChatId, userProjectId }) => {
  const instruction = instructions[instructionIndex]
  const navigate = useNavigate()
  console.log('Instruction', instructions)
  return (
    <div className="pb-10 h-full">
      <div className="fixed inset-x-0 bottom-0 px-4 py-2 flex justify-between z-10 space-x-5">
        {instructionIndex > 0
          ? <button className={'button primary'} onClick={() => setInstructionIndex(instructionIndex - 1)}>
            <div className="flex items-center justify-center">
              <div><IoIosArrowBack className='m-1' /></div>
              <div>Previous Step</div>
            </div>
          </button>
          : <button className={'button secondary'} onClick={() => setInstructionIndex(instructionIndex - 1)}>
            <div className="flex items-center justify-center">
              <div><IoIosArrowBack className='m-1' /></div>
              <div>Project Details</div>
            </div>
          </button>}
        {instructionIndex + 1 < instructions.length
          ? <button className="button primary" onClick={() => setInstructionIndex(instructionIndex + 1)}>
            <div className="flex items-center justify-center">
              <div>Next Step</div>
              <div><IoIosArrowForward className='m-1' /></div>
            </div>
          </button>
          : <button className={'button secondary'} onClick={() => navigate('completion')}>
            <div className="flex items-center justify-center">
              <div>Project Completed</div>
              <div><IoIosArrowForward className='m-1' /></div>
            </div>
          </button>}

      </div>
      <div className='flex flex-row h-full space-x-10 p-5'>
        <div className={`${instruction.images.length > 0 && 'w-1/3'} h-full overflow-y-auto`}>
          <div className='mb-6 mt-6'>
            <h3 className='text-lg my-auto'>
              <span className='font-bold'>{instruction.title}</span>
            </h3>
          </div>

          {instruction.body.map((paragraph, i) =>
            <InstructionParagraph key={i} paragraph={paragraph} />
          )}
          {instruction.downloads ? <InstructionParagraph paragraph={instruction.downloads}/> : <></>}
        </div>
        {instruction.images.length > 0 && <div className='flex flex-col w-1/3 h-full flex-grow-1'>

            <ImageCarousel images={instruction.images} />
        </div>}
        <div className='w-1/3 h-full flex-grow-1'>
          <GuidanceChat guidanceChatId={guidanceChatId} userProjectId={userProjectId}/>
        </div>
      </div>

      {/* <div className='flex place-content-between'>
        {instructionIndex > 0 ? <Button variant='secondary' onClick={() => setInstructionIndex(instructionIndex - 1)}>Previous Step</Button> : <></>}
        {instructionIndex + 1 < instructions.length ? <Button variant='accent' onClick={() => setInstructionIndex(instructionIndex + 1)}>Next Step</Button> : <></>}
      </div> */}
    </div>
  )
}

export default Instruction
