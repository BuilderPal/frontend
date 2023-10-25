import { Component, useState } from 'react';
import { Textarea } from 'components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import VoiceRecorder from './VoiceRecorder';
import { Button } from "components/ui/button"

export default function ChatInput({ onTextSubmit }) {
  const [queryText, setQueryText] = useState("");

  const handleTextSubmit = async () => {
    if (!queryText) {
      return;
    }

    onTextSubmit(queryText);

    setQueryText("");
  };
    return (
      <div className='p-4'>
      <Tabs defaultValue='text'>
        <TabsList>
          <TabsTrigger value='text'>Text</TabsTrigger>
          <TabsTrigger value='audio'>Audio</TabsTrigger>
        </TabsList>
        <TabsContent value='text'>
          <Textarea 
            value={queryText}
            onChange={e => setQueryText(e.target.value)}
            placeholder='' className='text-black'/>
        </TabsContent>
        <Button>
          Send
        </Button>
        <TabsContent value='audio'>
          <VoiceRecorder/>
        </TabsContent>
      </Tabs>
    </div>
    )
}
