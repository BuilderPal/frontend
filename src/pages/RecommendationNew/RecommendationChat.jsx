import React, { useEffect, useState, useRef } from 'react'
import '@dotlottie/player-component'
import { API } from 'lib/utils'

import builderPalImg from 'styles/img/builderpal/minichatavatar.png'
import SimpleBar from 'simplebar-react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from 'components/ui/loader'
import ChatMessage from 'components/recommendation_new/ChatMessage'
import ResultNavigation from 'components/recommendation_new/ResultNavigation'
import Suggestion from 'components/recommendation_new/Suggestion'
import ChatInput from 'components/recommendation_new/ChatInput'

const guidingQuestions = [
  {
    response: 'What do you like to do during your free time?',
    suggestions: ['Coding', 'Draw or Crafting', 'Playing video games']
  },
  {
    response: 'What are your interests?',
    suggestions: ['Technology and Robotics', 'Science and Nature', 'Art and Music']
  },,
  {
    response: 'What have you done or made before in the past that was cool to you?',
    suggestions: []
  },
  {
    response: 'How much time do you have to complete the project',
    suggestions: ['Within 15 minutes', 'Couple of hours', 'A week']
  },
  {
    response: 'What tools do you like to work with?',
    suggestions: ['Basic Hand Tools and Craft Supplies', 'Computer and Software', 'Electronics and Kits p p']
  },
  {
    response: 'What are your interests?',
    suggestions: []
  }
]

const GUIDING_QUESTIONS_MIN = 5

export default function RecommendationChat () {
  const { id: recommendationChatId } = useParams()
  const [iterations, setIterations] = useState([])
  const [iterationsLength, setIterationsLength] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false)
  const [shouldShowResults, setShouldShowResults] = useState(false)
  const [messages, setMessages] = useState([])
  // standard, conversational, guiding + messages_left
  const [conversationTypeMetadata, setConversationTypeMetadata] = useState({ type: 'standard' })
  const isMounted = useRef(true)
  const scrollRef = useRef(null)

  const navigate = useNavigate()

  useEffect(() => {
    const metadataStr = localStorage.getItem('conversationTypeMetadata')
    if (metadataStr) {
      const metadata = JSON.parse(metadataStr)
      if (metadata?.recommendationChatId === recommendationChatId) {
        setConversationTypeMetadata(metadata.conversationTypeMetadata)
      }
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('conversationTypeMetadata', JSON.stringify({ conversationTypeMetadata, recommendationChatId }))
  }, [conversationTypeMetadata])
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
    isMounted.current = true
    return () => { isMounted.current = false }
  }, [recommendationChatId])
  useEffect(() => {
    setIterationsLength(iterations.length)
  }, [iterations])
  useEffect(() => {
    console.log('Iteration length changed', iterationsLength)
    console.log('Iterations', iterations)
  }, [iterationsLength])

  useEffect(() => {
    fetchRecommendationChat(recommendationChatId)
  }, [recommendationChatId])
  useEffect(() => {
    fetchMetadata(recommendationChatId, iterationsLength - 1)
  }, [recommendationChatId, iterationsLength])
  const currIteration = iterations.length ? iterations?.[iterations.length - 1] : null
  const getDiscoveryResponseAudioAPI = (type, recommendationChatId, iterationIndex, blob) => {
    switch (type) {
      case 'standard':
        return API.getDiscoverySpeechStandardResponse(recommendationChatId, iterationIndex, blob)
      case 'conversational':
        return API.getDiscoverySpeechConversationalResponse(recommendationChatId, iterationIndex, blob)
      case 'guiding':
        return API.getDiscoverySpeechGuidingResponse(recommendationChatId, iterationIndex, blob)
    }
  }
  const getDiscoveryGuidingResponse = (recommendationChatId, iterationIndex, message) => {
    const response = API.getDiscoveryGuidingResponse(recommendationChatId, iterationIndex, message)
    setConversationTypeMetadata((typeMetadata) => {
      if (typeMetadata.type !== 'guiding') {
        return typeMetadata
      }
      if (typeMetadata.messages_left === 0) {
        return { type: 'standard' }
      }
      return { ...typeMetadata, messages_left: typeMetadata.messages_left - 1 }
    })
    return response
  }
  const getDiscoveryResponseAPI = (type, recommendationChatId, iterationIndex, message) => {
    switch (type) {
      case 'standard':
        return API.getDiscoveryStandardResponse(recommendationChatId, iterationIndex, message)
      case 'conversational':
        return API.getDiscoveryConversationalResponse(recommendationChatId, iterationIndex, message)
      case 'guiding':
        return getDiscoveryGuidingResponse(recommendationChatId, iterationIndex, message)
    }
  }
  const fetchMetadata = async (queryRecommendationChatId, iterationIndex) => {
    if (!isMounted.current) {
      return
    }
    if (recommendationChatId !== queryRecommendationChatId || iterationIndex <= 0 || iterations.length <= iterationIndex || (iterations[iterationIndex]?.suggestions.length)) {
      return
    }
    if (conversationTypeMetadata.type === 'guiding') {
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
  const fetchRecommendationChat = async (id) => {
    setIsLoading(true)
    const { data: messages } = await API.getDiscoveryChat(id)
    const iterations = messages.map(({ ai_message: { content: response }, user_message: message, user_options: suggestions }) => ({
      response,
      message: message?.content ?? '',
      suggestions: suggestions ?? []
    })
    )
    setIterations(iterations)
    setIsLoading(false)
  }
  const fetchAIResponse = async (message, type = conversationTypeMetadata.type) => {
    setIsAwaitingResponse(true)

    try {
      const iterationIndex = iterations.length - 1
      updateIteration(iterationIndex, 'message', (_) => message)
      setIterations(prevIterations => [...prevIterations, { response: '', suggestions: [], message: '' }])
      const response = await getDiscoveryResponseAPI(type, recommendationChatId, iterationIndex, message)
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
      setIterations(prevIterations => [...prevIterations, { response: '', suggestions: [], message: '' }])

      const formData = new FormData()
      formData.append('chat_id', recommendationChatId)
      formData.append('audio', blob)
      const response = await getDiscoveryResponseAudioAPI(conversationTypeMetadata.type, recommendationChatId, iterationIndex, blob)
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

  const updateConversationTypeMetadata = (type) => {
    if (type === 'standard') {
      setConversationTypeMetadata({ type })
    } else if (type === 'conversational') {
      setConversationTypeMetadata({ type })
    } else if (type === 'guiding') {
      setConversationTypeMetadata({ type, messages_left: GUIDING_QUESTIONS_MIN })
    }
  }

  const beStandard = () => {
    updateConversationTypeMetadata('standard')
    fetchAIResponse('I have an idea of what I want built but need help.', 'standard')
  }

  const beGuiding = () => {
    updateConversationTypeMetadata('guiding')
    fetchAIResponse('I have no idea what I want to build.', 'guiding')
  }

  const beConversational = () => {
    updateConversationTypeMetadata('conversational')
    fetchAIResponse('I just want to talk to you!', 'conversational')
  }

  return (
        <div className="builderpal">
            {
                isLoading
                  ? <Loader />
                  : (
                        <>
                            <header className="header">

                                <div className="header-actions">

                                    <div className="header-brand">

                                        <div className="logo">

                                            <svg className="icon-logo-vikinger small">
                                                <path d="M27.18,24.038c-0.141-0.095-0.244-0.146-0.244-0.146l-0.005-0.049C25.489,22.783,23.103,22,23.103,22c1.542,0,2.582-0.563,3.501-1.334c-0.049-0.055,0.7-0.666,0.7-0.666c0.146-8.251-4.477-12.745-7.001-14.667C18.15,9.564,16.802,14,16.802,14c-0.219-4.426,0.243-8.072,0.7-10.667c-0.85-0.452-1.956-0.698-2.296-1.537C14.865,0.957,14.015,0,14.015,0L14,0.014L13.985,0c0,0-0.85,0.957-1.19,1.796c-0.34,0.839-1.445,1.085-2.295,1.537C10.957,5.928,11.418,9.574,11.2,14c0,0-1.349-4.436-3.501-8.667C5.174,7.255,0.551,11.749,0.697,20c0,0,0.75,0.611,0.701,0.666C2.316,21.437,3.357,22,4.898,22c0,0-2.387,0.783-3.829,1.844l-0.005,0.049c0,0-0.104,0.051-0.244,0.146c-0.48,0.397-0.806,0.828-0.819,1.269c-0.023,0.521,0.263,1.181,1.233,1.973c0,0,0.136,9.259,9.69,11.29c0,0,0.212,0.815,0.975,1.431L14,38l2.102,2c0.763-0.615,0.975-1.431,0.975-1.431c9.555-2.031,9.689-11.29,9.689-11.29
  c0.971-0.792,1.256-1.451,1.233-1.973C27.986,24.866,27.659,24.436,27.18,24.038z M4.198,26c2.362,0.121,3.517,1.473,5.602,4c0.799,0.969,2.059,0.83,2.059,0.83L11.899,34C5.249,34,4.198,26,4.198,26z M14,28.162l-2.97-2.828l2.101-2.001l-2.101-2l2.101-2l-2.101-2L14,14.505l2.972,2.828l-2.102,2l2.102,2l-2.102,2l2.102,2.001L14,28.162z M16.102,34l0.041-3.17
  c0,0,1.26,0.139,2.059-0.83c2.085-2.527,3.239-3.879,5.602-4C23.803,26,22.752,34,16.102,34z M13.3,26h1.4v-1.333h-1.4V26z M13.3,22h1.4v-1.334h-1.4V22z M13.3,18h1.4v-1.333h-1.4V18z"/>
                                            </svg>

                                        </div>

                                        <h1 className="header-brand-text">Vikinger</h1>

                                    </div>

                                </div>

                            </header>

                            <div className="content-grid">

                                <div className="grid grid-12">
                                    <div className="section-header">

                                        <div className="section-header-info">

                                            <h2 className="section-title">Build with BuilderPal!</h2>

                                        </div>

                                    </div>

                                    <div className="account-hub-content">

                                        <div className="chat-widget-wrap">
                                            {/* Left Interface */}

                                            <div className="chat-widget static">

                                                <div className="chat-widget-messages">
                                                    <center><dotlottie-player
                                                        src="https://lottie.host/67515202-8d9e-4263-adfa-4b8237f3f6fa/eLeznstVNP.json"
                                                        background="transparent"
                                                        speed="1"
                                                        style={{ width: '300px', height: '300px' }}
                                                        loop
                                                        autoplay
                                                    /></center>
                                                    {/* <center>
                                    <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>

                                    <dotlottie-player src="https://lottie.host/67515202-8d9e-4263-adfa-4b8237f3f6fa/eLeznstVNP.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>
                                </center> */}
                                                    <p className="starter-title-message">Lets make something together! Do you have an idea you want to bring to life?</p>
                                                    <button className="button medium primary starter" onClick={beStandard} disabled={isAwaitingResponse}>I have an idea of what I want built but need help</button>
                                                    <button className="button medium primary starter" onClick={beGuiding} disabled={isAwaitingResponse}>I don’t know what I want to build</button>
                                                    <button className="button medium primary starter" onClick={() => navigate(`/${recommendationChatId}/static/${iterationsLength - 1}`)} disabled={isAwaitingResponse}>Show me what I can build with materials available at VIVISTOP</button>
                                                    <button className="button medium primary starter" onClick={beConversational} disabled={isAwaitingResponse}>I just want to talk to you!</button>
                                                </div>

                                            </div>
                                            {/* Chat Interface */}
                                            <div className="chat-widget">

                                                <div className="chat-widget-header">

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

                                                <SimpleBar className="chat-widget-conversation" ref={scrollRef}>
                                                    <>
                                                    {
                                                        messages.map(({ isUser, message }, i) => (
                                                            <ChatMessage key={i} isUser={isUser} message={message} />
                                                        ))
                                                    }
                                                    </>
                                                    {
                                                        !isAwaitingResponse && conversationTypeMetadata.type !== 'guiding' && (
                                                          shouldShowResults && conversationTypeMetadata.type !== 'conversational'
                                                            ? <ResultNavigation navigateToDynamicResults={() => navigate(`/${recommendationChatId}/dynamic/${iterationsLength - 1}`)} navigateToStaticResults={() => navigate(`/${recommendationChatId}/static/${iterationsLength - 1}`)} />
                                                            : currIteration.suggestions.map((suggestion, index) => (
                                                                <Suggestion suggestion={suggestion} sendSuggestion={fetchAIResponse} key={index} />
                                                            ))
                                                        )
                                                    }

                                                </SimpleBar>
                                                {/* User Input */}
                                                <ChatInput sendTextMessage={(message) => setTimeout(() => fetchAIResponse(message), 1000)} sendAudioMessage={{ fetchAIResponseAudioMessage }} />

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div></>
                    )
            }

        </div>
  )
}
