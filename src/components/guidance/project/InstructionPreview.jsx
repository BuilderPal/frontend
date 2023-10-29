import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar'

import happy from 'assets/avatar/happy.png'
import React from 'react'
const InstructionPreview = ({ instruction, instructionIndex, setInstructionIndex, isIdle }) => {
  const isOngoing = instruction.instruction_index === instructionIndex

  return (<div
      className={`flex w-full rounded-lg p-4 ${isOngoing ? 'bg-nusb-v-light' : 'bg-nusb-light'} ${isIdle ? '' : 'hover:bg-nusb-v-light cursor-pointer'}`}
      onClick={() => isIdle ? 0 : setInstructionIndex(instruction.instruction_index)}>
      <div className='w-1/12 justify-items-center'>
        <Avatar>
          <AvatarImage src={happy}/>
          <AvatarFallback>Happy</AvatarFallback>
        </Avatar>
      </div>
      <h3 className='text-lg my-auto'>
        <span className='font-bold'>{instruction.title}</span>
      </h3>
    </div>)
}

export default InstructionPreview
