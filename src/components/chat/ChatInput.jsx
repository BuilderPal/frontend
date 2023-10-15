import { Component } from 'react';
import { Textarea } from 'components/ui/textarea';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Textarea placeholder='hello'/>;
  }
}

export default ChatInput;