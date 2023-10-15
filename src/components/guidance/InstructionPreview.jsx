import { Component } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';

import happy from 'assets/avatar/happy.png';
import InstructionNavigationPopover from './InstructionNavigationPopover';

class InstructionPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompleted: this.props.instruction.instruction_index < this.props.current,
      isOngoing: this.props.instruction.instruction_index === this.props.current
    };
  }

  render() {
    return <Popover>
      <PopoverTrigger className={`flex w-full rounded-lg p-4 cursor-pointer ${this.state.isOngoing ? 'bg-nusb-v-light' : 'bg-nusb-light hover:bg-nusb-v-light'}`}>
        <div className='w-1/12 justify-items-center'>
          <Avatar>
            <AvatarImage src={happy}/>
            <AvatarFallback>Happy</AvatarFallback>
          </Avatar>
        </div>
        <h3 className='text-lg my-auto'><span className='font-bold'>Step {this.props.instruction.instruction_index+1}</span>: {this.props.instruction.title}</h3>
      </PopoverTrigger>
      <PopoverContent>
        <InstructionNavigationPopover/>
      </PopoverContent>
    </Popover>;
  }
}

export default InstructionPreview