import { Component } from 'react';

class InstructionParagraph extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <p className='mt-2'>{this.props.paragraph}</p>
  }
}

export default InstructionParagraph ;