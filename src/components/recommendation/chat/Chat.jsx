import React, { useEffect, useRef, useState } from 'react'
import Breadcrumbs from './Breadcrumbs'
import ChatInput from './ChatInput'
import Question from './Question'
import Suggestion from './Suggestion'
import { ClipLoader } from 'react-spinners'
import { API } from '../../../lib/utils'
import { Button } from 'components/ui/button'
import { useNavigate } from 'react-router-dom'

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
  const [iterationsLength, setIterationsLength] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false)
  const isMounted = useRef(true)
  useEffect(() => {
    isMounted.current = true
    return () => { isMounted.current = false }
  }, [recommendationChatId])
  useEffect(() => {
    setIterationsLength(iterations.length)
  }, [iterations])
  useEffect(() => {
    setCurrIterationIndex(iterationsLength - 1)
  }, [iterationsLength])
  // Derive from iterations
  const currIteration = iterations.length ? iterations?.[iterations.length - 1] : null
  const breadcrumbs = iterations?.map(message => message.breadcrumb)
  // Retrieve iterations using API
  useEffect(() => {
    console.log(recommendationChatId)
    fetchRecommendationChat(recommendationChatId)
  }, [recommendationChatId])
  useEffect(() => {
    fetchSuggestionsAndBreadcrumb(recommendationChatId, iterationsLength - 1)
  }, [recommendationChatId, iterationsLength])
  const navigate = useNavigate()

  const navigateToIteration = async (iterationIndex) => {
    const { data: { chat_id: newRecommendationChatId } } = await API.navigateToBreadcrumb(recommendationChatId, iterations[iterationIndex].breadcrumb)
    navigate(`/${newRecommendationChatId}`)
  }

  // const sendTextMessage = async (message) => {
  //   setIsAwaitingResponse(true)
  //   const {
  //     data: {
  //       text: response, breadcrumb_title: breadcrumb, user_options: suggestions
  //     }
  //   } = await API.sendDiscoverageChatMessage(recommendationChatId, message)
  //   const iteration = {
  //     response,
  //     breadcrumb,
  //     suggestions,
  //     message
  //   }
  //   setIterations((iterations) => [...iterations, iteration])
  //   setIterationIndex(i => i + 1)
  //   setIsAwaitingResponse(false)
  // }
  const sendAudioMessage = (blob) => {
    // setIterationIndex(i => i + 1)
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

  const fetchSuggestionsAndBreadcrumb = async (queryRecommendationChatId, iterationIndex) => {
    if (!isMounted.current) {
      return
    }
    if (recommendationChatId !== queryRecommendationChatId || iterationIndex <= 0 || iterations.length <= iterationIndex || (iterations[iterationIndex]?.suggestions.length && iterations[iterationIndex]?.breadcrumb)) {
      return
    }
    const { data: { is_section_registered: isReady, suggestions, breadcrumb } } = await API.getDiscoveryChatSuggestionsAndBreadCrumb(queryRecommendationChatId, iterationIndex)
    if (isReady) {
      updateIteration(iterationIndex, 'suggestions', (_) => suggestions)
      updateIteration(iterationIndex, 'breadcrumb', (_) => breadcrumb)
    } else {
      setTimeout(() => fetchSuggestionsAndBreadcrumb(queryRecommendationChatId, iterationIndex), 2000)
    }
  }
  const fetchAIResponse = async (message) => {
    try {
      const iterationIndex = iterations.length - 1
      setIterations(prevIterations => [...prevIterations, { response: '', breadcrumb: '...', suggestions: [], message: '' }])
      const response = await fetch(API._constructUrl(`/api/discovery_chats/${recommendationChatId}/messages/${iterationIndex}`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      })
      const reader = response.body.getReader()

      const decoder = new TextDecoder()

      reader.read().then(function processText ({ done, value }) {
        if (done) {
          return
        }
        const responseText = decoder.decode(value)

        updateIteration(iterationIndex + 1, 'response', (prevResponse) => (prevResponse ?? '') + responseText)

        return reader.read().then(processText)
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
    <div className="flex flex-col flex-grow-0 p-4 w-1/3 h-full bg-gray-200">
      {
        isLoading || !iterations.length
          ? <ClipLoader isLoading={isLoading || !iterations.length} />
          : (
            <>
            <div className="h-30 mb-4">
                  <Breadcrumbs breadcrumbs={breadcrumbs} navigateToIteration={navigateToIteration} />
                </div>
              <div className='overflow-y-auto '>
                <div className="items-center my-8">
                  <Question question={currIteration.response} />
                </div>
              </div>
              <div className='mt-auto'>
                <div className="flow-1 flow flow-col mt-auto">
                  {!isAwaitingResponse && currIteration.suggestions.map((suggestion, index) => (
                    <Suggestion suggestion={suggestion} sendSuggestion={fetchAIResponse} key={index} />
                  ))}
                </div>
                <div className="flex-0 h-30 mb-3">
                  <ChatInput sendTextMessage={fetchAIResponse} sendAudioMessage={sendAudioMessage} />
                </div>
              </div>
            </>
            )
      }

    </div>
  )
}

export default Chat
