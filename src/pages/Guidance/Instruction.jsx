import { Component } from 'react';
import InstructionParagraph from 'components/guidance/InstructionParagraph';
import ImageCarousel from 'components/guidance/ImageCarousel';
import InstructionPreview from '../../components/guidance/InstructionPreview';
import { Button } from 'components/ui/button';

class Instruction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instruction: this.props.instructions[this.props.current]
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.current !== prevProps.current ||
      this.props.instructions !== prevProps.instructions
    ) {
      // Update the instruction state when props change
      this.setState({
        instruction: this.props.instructions[this.props.current]
      });
    }
  }

  render() {
    return <div className='text-white w-full mb-10 overflow-y-auto'>
      <div className='mb-6 mt-6'>
        <InstructionPreview
          instruction={this.state.instruction}
          isIdle={true}/>
      </div>
      <div className='flex place-content-between'>
        {this.props.current > 0 ? <Button variant='secondary' onClick={() => this.props.changeCurrentInstruction(this.props.current-1)}>Previous Step</Button> : <></>}
        {this.props.current+1 < this.props.instructions.length ? <Button variant='accent' onClick={() => this.props.changeCurrentInstruction(this.props.current+1)}>Next Step</Button> : <></>}
      </div>

      <h2 className='text-2xl my-auto font-bold mb-2 mt-6'>Instructions</h2>
      {this.state.instruction.body.map(paragraph => 
        <InstructionParagraph paragraph={paragraph}/>
      )}

      <h2 className='text-2xl my-auto font-bold mb-2 mt-6'>Images</h2>
      <ImageCarousel images={this.state.instruction.images}/>
    </div>;
  }
}

export default Instruction;