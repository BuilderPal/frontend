import React, { useEffect, useState } from 'react'
import Breadcrumbs from './Breadcrumbs'
import ChatInput from './ChatInput'
import Question from './Question'
import Suggestion from './Suggestion'
import { ClipLoader } from 'react-spinners'
import { API } from '../../../lib/utils'
import { Button } from 'components/ui/button'

const recommendationChatSample =
  [{
    breadcrumb: 'Introduction',
    response: 'What do you want to build today?',
    emotion: 'neutral',
    message: '',
    suggestions: [
      {
        title: 'Weaving',
        description: 'I would like to weave today'
      },
      {
        title: '3D printing',
        description: 'I would like to do 3D printing today'
      },
      {
        title: 'Baking',
        description: 'I would like to bake today'
      }
    ]
  }]

function Chat ({ recommendationChatId, setCurrIterationIndex }) {
  const [iterations, setIterations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false)
  const [currIterationIndex, setIterationIndex] = useState(0)

  // Derive from iterations
  const currIteration = iterations.length ? iterations?.[iterations.length - 1] : null
  const breadcrumbs = iterations?.map(message => message.breadcrumb)

  // Retrieve iterations using API
  useEffect(() => {
    console.log(recommendationChatId)
    fetchRecommendationChat(recommendationChatId)
  }, [recommendationChatId])

  useEffect(() => setCurrIterationIndex(currIterationIndex), [currIterationIndex])

  const navigateToIteration = (iterationIndex) => {
    setIterations((iterations) => {
      if (!iterations || iterationIndex >= iterations.length) {
        return iterations
      } else {
        return iterations.slice(0, iterationIndex + 1)
      }
    })
    setIterationIndex(i => i + 1)
  }

  const sendTextMessage = async (message) => {
    setIsAwaitingResponse(true)
    const {
      data: {
        text: response, emote: emotion, breadcrumb_title: breadcrumb, user_options: suggestions
      }
    } = await API.sendDiscoverageChatMessage(recommendationChatId, message)
    const iteration = {
      response,
      emotion,
      breadcrumb,
      suggestions,
      message
    }
    setIterations((iterations) => [...iterations, iteration])
    setIterationIndex(i => i + 1)
    setIsAwaitingResponse(false)
  }
  const sendAudioMessage = (blob) => {
    setIterationIndex(i => i + 1)
  }
  //   class AIMessage(BaseModel):
  //   role: str = Field(default="assistant")
  //   content: str
  //   emote: EmoteOption = Field(default="neutral")

  // class UserMessage(BaseModel):
  //   role: str = Field(default="user")
  //   content: str

  // class UserOption(BaseModel):
  //   title: str
  //   description: str

  // class DiscoveryChatSection(BaseModel):
  //   title: str
  //   ai_message: AIMessage
  //   user_message: UserMessage | None = None
  //   user_options: list[UserOption] | None = None
  const fetchRecommendationChat = async (id) => {
    setIsLoading(true)
    const { data: messages } = await API.getDiscoveryChat(id)
    const iterations = messages.map(({ title: breadcrumb, ai_message: { content: response, emote: emotion }, user_message: message, user_options: suggestions }) => ({
      breadcrumb,
      response,
      emotion,
      message: message?.content ?? '',
      suggestions: suggestions ?? []
    })
    )
    setIterations(iterations)
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col p-4 w-1/3 min-w-fit h-full bg-gray-200">
      {
        isLoading || !iterations.length
          ? <ClipLoader isLoading={isLoading || !iterations.length} />
          : (
            <>
              <Button onClick={() => incrementIteration()}>Click me</Button>
              <div>
                <div className="flex-0 h-30 mb-4">
                  <Breadcrumbs breadcrumbs={breadcrumbs} navigateToIteration={navigateToIteration} />
                </div>
                <div className="items-center my-8">
                  <Question question={isAwaitingResponse ? '...' : currIteration.response} emotion={isAwaitingResponse ? 'thinking' : currIteration.emotion} />
                </div>
              </div>
              <div className='mt-auto'>
                <div className="flow-1 flow flow-col mt-auto">
                  {!isAwaitingResponse && currIteration.suggestions.map((suggestion, index) => (
                    <Suggestion suggestion={suggestion} sendSuggestion={sendTextMessage} key={index} />
                  ))}
                </div>
                <div className="flex-0 h-30 mb-3">
                  <ChatInput sendTextMessage={sendTextMessage} sendAudioMessage={sendAudioMessage} />
                </div>
              </div>
            </>
            )
      }

    </div>
  )
}

export default Chat
