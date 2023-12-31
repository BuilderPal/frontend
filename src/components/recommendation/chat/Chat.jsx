import React, { useEffect, useRef, useState } from 'react'
import Breadcrumbs from './Breadcrumbs'
import ChatInput from './ChatInput'
import Question from './Question'
import Suggestion from './Suggestion'
import { ClipLoader } from 'react-spinners'
import { API } from '../../../lib/utils'
import { Button } from 'components/ui/button'
import { useNavigate } from 'react-router-dom'
import ChatMessage from './ChatMessage'

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

function Chat ({ recommendationChatId, setCurrIterationIndex, setShouldShowResults, shouldShowResults }) {
  const [iterations, setIterations] = useState([])
  const [iterationsLength, setIterationsLength] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false)
  const [messages, setMessages] = useState([])
  const isMounted = useRef(true)
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
  console.log(messages)
  console.log('iterations', iterations)

  useEffect(() => {
    isMounted.current = true
    return () => { isMounted.current = false }
  }, [recommendationChatId])
  useEffect(() => {
    setIterationsLength(iterations.length)
  }, [iterations])
  useEffect(() => {
    console.log('Iteration length changed', iterationsLength)
    console.log('Iterations', iterations)
    setCurrIterationIndex(iterationsLength - 1)
  }, [iterationsLength])
  // Derive from iterations
  const currIteration = iterations.length ? iterations?.[iterations.length - 1] : null
  // const breadcrumbs = iterations?.map(message => message.breadcrumb)
  // Retrieve iterations using API
  useEffect(() => {
    console.log(recommendationChatId)
    fetchRecommendationChat(recommendationChatId)
  }, [recommendationChatId])
  useEffect(() => {
    fetchMetadata(recommendationChatId, iterationsLength - 1)
  }, [recommendationChatId, iterationsLength])
  const navigate = useNavigate()

  const navigateToIteration = async (iterationIndex) => {
    const { data: { chat_id: newRecommendationChatId } } = await API.navigateToBreadcrumb(recommendationChatId, iterationIndex)
    navigate(`/${newRecommendationChatId}`)
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

  const fetchMetadata = async (queryRecommendationChatId, iterationIndex) => {
    if (!isMounted.current) {
      return
    }
    if (recommendationChatId !== queryRecommendationChatId || iterationIndex <= 0 || iterations.length <= iterationIndex || (iterations[iterationIndex]?.suggestions.length && iterations[iterationIndex]?.breadcrumb)) {
      return
    }
    const { data: { is_section_registered: isReady, suggestions, should_recommend_projects: shouldRecommendProjects } } = await API.getDiscoveryChatMetadata(queryRecommendationChatId, iterationIndex)
    if (isReady) {
      updateIteration(iterationIndex, 'suggestions', (_) => suggestions)
      setShouldShowResults(shouldRecommendProjects)
    } else {
      setTimeout(() => fetchMetadata(queryRecommendationChatId, iterationIndex), 2000)
    }
  }
  const fetchAIResponse = async (message) => {
    try {
      const iterationIndex = iterations.length - 1
      updateIteration(iterationIndex, 'message', (_) => message)
      setIterations(prevIterations => [...prevIterations, { response: '', suggestions: [], message: '' }])
      const response = await fetch(API._constructUrl(`/api/discovery_chats/${recommendationChatId}/messages/${iterationIndex}`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      })
      const reader = response.body.getReader()
      handleResponseStream(reader, iterationIndex + 1)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchAIResponseAudioMessage = async (blob) => {
    try {
      const iterationIndex = iterations.length - 1
      setIterations(prevIterations => [...prevIterations, { response: '', suggestions: [], message: '' }])

      const formData = new FormData()
      formData.append('chat_id', recommendationChatId)
      formData.append('audio', blob)
      const response = await fetch(API._constructUrl(`/api/discovery_chats/${recommendationChatId}/speech/${iterationIndex}`), {
        method: 'POST',
        body: formData
      })
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
  const fetchRecommendationChat = async (id) => {
    setIsLoading(true)
    const { data: messages } = await API.getDiscoveryChat(id)
    const iterations = messages.map(({ title: breadcrumb, ai_message: { content: response }, user_message: message, user_options: suggestions }) => ({
      breadcrumb: breadcrumb ?? '...',
      response,
      message: message?.content ?? '',
      suggestions: suggestions ?? []
    })
    )
    setIterations(iterations)
    setIsLoading(false)
  }

  return (
    <div className={`transition-all duration-500 ease-in-out ${
      shouldShowResults ? 'w-1/2' : 'w-full'} flex flex-col flex-grow-0 p-4 h-full bg-gray-200`}>
      {
        isLoading || !iterations.length
          ? <ClipLoader isLoading={isLoading || !iterations.length} />
          : (
            <>
              {/* <div className="h-30 mb-4">
                <Breadcrumbs breadcrumbs={breadcrumbs} navigateToIteration={navigateToIteration} />
              </div> */}
              <div className='overflow-y-auto '>
                <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                      {
                          messages.map(({ isUser, message }, i) => (
                              <ChatMessage key={i} isUser={isUser} message={message}/>
                          ))
                      }
                  </div>
                {/* <div className="items-center my-8">
                  <Question question={currIteration.response} />
                </div> */}
              </div>
              <div className='mt-auto'>
                <div className="flow-1 flow flow-col mt-auto">
                  {!isAwaitingResponse && currIteration.suggestions.map((suggestion, index) => (
                    <Suggestion suggestion={suggestion} sendSuggestion={fetchAIResponse} key={index} />
                  ))}
                </div>
                <div className="flex-0 h-30 mb-3">
                  <ChatInput sendTextMessage={fetchAIResponse} sendAudioMessage={fetchAIResponseAudioMessage} />
                </div>
              </div>
            </>
            )
      }

    </div>
  )
}

export default Chat
