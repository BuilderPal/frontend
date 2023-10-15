import { Component } from 'react';

import TypingText from 'components/chat/TypingText';
import happy from 'assets/avatar/happy.png';
import forest from 'assets/bg/cloud.jpg';
import ChatInput from 'components/chat/ChatInput';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Hi! If you're having problems, feel free to ask me, okay?",
      options: []
    };
  }

  render() {
    return (
      <div className='relative h-screen overflow-x-auto'>
        {/* Background image */}
        <img
          src={forest}
          className='absolute inset-0 w-full h-full object-cover'
          alt='Forest'
        />
  
        {/* Content container */}
        <div className='grid items-center h-full w-full py-4 relative z-10'>
          <div className='grid gap-4'>
            <img src={happy} className='w-[200px] mx-auto' alt='Happy' />
            <TypingText text={this.state.text}/>
          </div>
          <ChatInput/>
        </div>
      </div>
    );
  }
  
}

export default Chat;