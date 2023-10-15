import { Component } from 'react';

import TypingText from 'components/chat/TypingText';
import happy from 'assets/avatar/happy.png';
import forest from 'assets/bg/forest.jpg';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="relative h-screen overflow-x-auto">
        {/* Background image */}
        <img
          src={forest}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Forest Background"
        />
  
        {/* Content container */}
        <div className="grid items-center h-full w-full py-4 relative z-10">
          <div className="grid gap-4">
            <img src={happy} className="w-[200px] mx-auto" alt="Happy Image" />
            <TypingText text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, quas eos quis nisi tenetur labore. Officia ducimus ratione voluptas veniam." />
          </div>
        </div>
      </div>
    );
  }
  
}

export default Chat;