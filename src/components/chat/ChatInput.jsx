import { Component } from 'react';
import { Textarea } from 'components/ui/textarea';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className='p-4'>
      <Textarea placeholder='hello' className='text-black'/>
    </div>;
  }
}

export default ChatInput;