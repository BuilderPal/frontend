import { Component } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';

import happy from 'assets/avatar/happy.png';

class InstructionPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompleted: this.props.instruction.instruction_index < this.props.current,
      isOngoing: this.props.instruction.instruction_index === this.props.current
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.current !== prevProps.current
    ) {
      // Update the instruction state when props change
      this.setState({
        isCompleted: this.props.instruction.instruction_index < this.props.current,
        isOngoing: this.props.instruction.instruction_index === this.props.current
      });
    }
  }

  render() {
    return <div
      className={`flex w-full rounded-lg p-4 ${this.state.isOngoing ? 'bg-nusb-v-light' : 'bg-nusb-light'} ${this.props.isIdle ? '' : 'hover:bg-nusb-v-light cursor-pointer'}`}
      onClick={() => !!this.props.isIdle ? 0 : this.props.changeCurrentInstruction(this.props.instruction.instruction_index)}>
      <div className='w-1/12 justify-items-center'>
        <Avatar>
          <AvatarImage src={happy}/>
          <AvatarFallback>Happy</AvatarFallback>
        </Avatar>
      </div>
      <h3 className='text-lg my-auto'>
        <span className='font-bold'>{this.props.instruction.title}</span>
      </h3>
    </div>;
  }
}

export default InstructionPreview
