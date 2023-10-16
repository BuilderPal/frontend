import { Component } from 'react';
import { Textarea } from 'components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import VoiceRecorder from './VoiceRecorder';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className='p-4'>
      <Tabs defaultValue='text'>
        <TabsList>
          <TabsTrigger value='text'>Text</TabsTrigger>
          <TabsTrigger value='audio'>Audio</TabsTrigger>
        </TabsList>
        <TabsContent value='text'>
          <Textarea placeholder='hello' className='text-black'/>
        </TabsContent>
        <TabsContent value='audio'>
          <VoiceRecorder/>
        </TabsContent>
      </Tabs>
    </div>;
  }
}

export default ChatInput;