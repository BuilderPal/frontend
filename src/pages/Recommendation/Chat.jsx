import React, { useEffect, useState } from 'react'
import Breadcrumbs from './Breadcrumbs'
import ChatInput from './ChatInput'
import Question from './Question'
import Suggestion from './Suggestion'
import { ClipLoader } from 'react-spinners'

function Chat ({ recommendationChatId }) {
  // const [recommendationChat, setRecommendationChat] = useState(null)
  // Derive from recommendationChat
  const suggestions = []
  const breadcrumbs = []
  const question = 'How is your day?'
  const emotion = 'happy'
  const [isLoading, setIsLoading] = useState(false)
  const navigateToIteration = (iterationIndex) => {

  }
  const sendTextMessage = (message) => {

  }
  const sendAudioMessage = (blob) => {

  }
  useEffect(() => {
    setIsLoading(true)
    // Retrieve RecommendationChat using API
    setIsLoading(false)
  }, [recommendationChatId])

  return (
    <div className="flex flex-col p-4 w-1/3 h-full bg-gray-200">
      {
        isLoading
          ? <ClipLoader isLoading={isLoading}/>
          : (
            <>
              <div className="flex mb-4">
                <Breadcrumbs breadcrumbs={breadcrumbs} navigateToIteration={navigateToIteration}/>
              </div>
              <div className="flex items-center mb-4">
                <Question question={question} emotion={emotion}/>
              </div>
              {suggestions.map((suggestion, index) => <Suggestion suggestion={suggestion} key={index} />)}
              <ChatInput sendTextMessage={sendTextMessage} sendAudioMessage={sendAudioMessage}/>
            </>
            )
      }

    </div>
  )
}

export default Chat
