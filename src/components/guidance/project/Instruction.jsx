import React, { useState } from 'react'
import InstructionParagraph from 'components/guidance/project/InstructionParagraph'
import ImageCarousel from 'components/guidance/project/ImageCarousel'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import GuidanceChat from '../chat2/GuidanceChat'
const Instruction = ({ instructions, instructionIndex, setInstructionIndex, guidanceChatId, userProjectId }) => {
  const [showSidebar, setShowSidebar] = useState(true)
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
          {instruction.downloads ? <InstructionParagraph paragraph={instruction.downloads} /> : <></>}
        </div>
        {instruction.images.length > 0 && <div className='flex flex-col w-1/3 h-full flex-grow-1'>

          <ImageCarousel images={instruction.images} />
        </div>}

        <div className={`top-0 right-0 w-[35vw] ease-in-out duration-300 py-10 pr-10 text-white fixed h-full z-40 ${showSidebar ? 'translate-x-0 ' : 'translate-x-full'}`}>

          <GuidanceChat guidanceChatId={guidanceChatId} userProjectId={userProjectId} />
          <svg
            onClick={() => setShowSidebar(!showSidebar)}
            className="fixed  z-30 flex items-center cursor-pointer -left-14 top-5"
            viewBox="0 0 29.536 29.536"
            width="40"
            height="40"
          > {showSidebar
            ? <path d="M18,16.547L16.545,18L10,11.455L3.455,18L2,16.547L8.545,10L2,3.455L3.455,2L10,8.546L16.545,2L18,3.455L11.455,10L18,16.547z" />
            : <>
              <path d="M14.768,0C6.611,0,0,6.609,0,14.768c0,8.155,6.611,14.767,14.768,14.767s14.768-6.612,14.768-14.767
		C29.535,6.609,22.924,0,14.768,0z M14.768,27.126c-6.828,0-12.361-5.532-12.361-12.359c0-6.828,5.533-12.362,12.361-12.362
		c6.826,0,12.359,5.535,12.359,12.362C27.127,21.594,21.594,27.126,14.768,27.126z"/>
              <path d="M14.385,19.337c-1.338,0-2.289,0.951-2.289,2.34c0,1.336,0.926,2.339,2.289,2.339c1.414,0,2.314-1.003,2.314-2.339
		C16.672,20.288,15.771,19.337,14.385,19.337z"/>
              <path d="M14.742,6.092c-1.824,0-3.34,0.513-4.293,1.053l0.875,2.804c0.668-0.462,1.697-0.772,2.545-0.772
		c1.285,0.027,1.879,0.644,1.879,1.543c0,0.85-0.67,1.697-1.494,2.701c-1.156,1.364-1.594,2.701-1.516,4.012l0.025,0.669h3.42
		v-0.463c-0.025-1.158,0.387-2.162,1.311-3.215c0.979-1.08,2.211-2.366,2.211-4.321C19.705,7.968,18.139,6.092,14.742,6.092z"/>
            </>}
          </svg>
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
