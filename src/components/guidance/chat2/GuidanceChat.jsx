import React, { useEffect, useState, useRef } from 'react'
import '@dotlottie/player-component'
import { API } from 'lib/utils'

import builderPalImg from 'styles/img/builderpal/minichatavatar.png'
import SimpleBar from 'simplebar-react'
import Loader from 'components/ui/loader'
import ChatMessage from 'components/recommendation_new/ChatMessage'
import ChatInput from 'components/recommendation_new/ChatInput'
export default function GuidanceChat ({ guidanceChatId, userProjectId }) {
  const [iterations, setIterations] = useState([])
  //   const [iterationsLength, setIterationsLength] = useState(0)
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false)
  const [messages, setMessages] = useState([])
  //   const bottomDiv = useRef(null)
  //   const scrollToBottomChat = () => {
  //     bottomDiv.current?.scrollIntoView({ behaviour: 'smooth' })
  //   }
  const currIteration = iterations.length ? iterations?.[iterations.length - 1] : null
  //   useEffect(() => {
  //     scrollToBottomChat()
  //   }, [iterationsLength, suggestions])
  // standard, conversational, guiding + messages_left

  useEffect(() => {
    setMessages(iterations.flatMap((iteration) => {
      const iterationMessages = [{
        isUser: false,
        message: iteration.response
      }]
      if (iteration.message !== '') {
        iterationMessages.push({
          isUser: true,
          message: iteration.message
        })
      }
      return iterationMessages
    }))
  }, [iterations])

  useEffect(() => {
    fetchChat(guidanceChatId)
  }, [guidanceChatId])

  const fetchChat = async (id) => {
    const { data: messages } = await API.getGuidanceChat(id)
    const iterations = messages.map(({ ai_message: { content: response }, user_message: message }) => ({
      response,
      message: message?.content?.message ?? ''
    })
    )
    setIterations(iterations)
  }
  const fetchAIResponse = async (message) => {
    setIsAwaitingResponse(true)

    try {
      const iterationIndex = iterations.length - 1
      updateIteration(iterationIndex, 'message', (_) => message)
      setIterations(prevIterations => [...prevIterations, { response: '', message: '' }])
      const response = await API.getGuidanceResponse(guidanceChatId, iterationIndex, message)
      const reader = response.body.getReader()
      handleResponseStream(reader, iterationIndex + 1)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  const fetchAIResponseAudioMessage = async (blob) => {
    setIsAwaitingResponse(true)
    try {
      const iterationIndex = iterations.length - 1
      setIterations(prevIterations => [...prevIterations, { response: '', message: '' }])

      const response = await API.getGuidanceSpeechResponse(guidanceChatId, iterationIndex, blob)
      const reader = response.body.getReader()
      handleResponseStream(reader, iterationIndex + 1)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleResponseStream = (stream, iterationIndex) => {
    try {
      const decoder = new TextDecoder()

      stream.read().then(function processText ({ done, value }) {
        if (done) {
          setIsAwaitingResponse(false)
          return
        }
        const responseText = decoder.decode(value)

        updateIteration(iterationIndex, 'response', (prevResponse) => (prevResponse ?? '') + responseText)

        return stream.read().then(processText)
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const updateIteration = (iterationIndex, field, modifier) => {
    setIterations(prevIterations => {
      if (prevIterations.length <= iterationIndex) {
        return prevIterations
      }
      return [...prevIterations.slice(0, iterationIndex), {
        ...prevIterations[iterationIndex],
        [field]: modifier(prevIterations[iterationIndex][field])
      }, ...prevIterations.slice(iterationIndex + 1)]
    })
  }

  return (
        <div className="guidance-chat chat-widget">

                        <div className="chat-widget-header flex justify-between items-center">

                          <div className="user-status">

                            <div className="user-status-avatar">

                              <div className="user-avatar small no-outline online">

                                <div className="user-avatar-content">

                                  <img className="hexagon-image-30-32" src={builderPalImg} />

                                </div>

                              </div>

                            </div>

                            <p className="user-status-title"><span className="bold">BuilderPal</span></p>

                            <p className="user-status-tag online">Online</p>

                          </div>

                        </div>

                        <SimpleBar className="chat-widget-conversation">
                          <>
                            {
                              messages.map(({ isUser, message }, i) => (
                                <ChatMessage key={i} isUser={isUser} message={message} />
                              ))
                            }
                          </>
                          <div />
                        </SimpleBar>
                        {/* User Input */}
                        <ChatInput sendTextMessage={(message) => setTimeout(() => fetchAIResponse(message), 1000)} sendAudioMessage={fetchAIResponseAudioMessage} isAwaitingResponse={isAwaitingResponse}/>

                      </div>
  )
}
