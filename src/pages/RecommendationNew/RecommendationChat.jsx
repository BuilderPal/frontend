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
import { IoCreateOutline } from 'react-icons/io5'
import logo from 'styles/img/craft.png'
const guidingQuestions = [
  {
    response: 'What do you like to do during your free time?',
    suggestions: ['Coding', 'Draw or Crafting', 'Playing video games']
  },
  {
    response: 'What are your interests?',
    suggestions: ['Technology and Robotics', 'Science and Nature', 'Art and Music']
  }, ,
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
    const metadataStr = localStorage.getItem(`conversationTypeMetadata_${recommendationChatId}`)
    if (metadataStr) {
      const metadata = JSON.parse(metadataStr)
      if (metadata?.recommendationChatId === recommendationChatId) {
        setConversationTypeMetadata(metadata.conversationTypeMetadata)
      }
    }
  }, [])
  useEffect(() => {
    localStorage.setItem(`conversationTypeMetadata_${recommendationChatId}`, JSON.stringify({ conversationTypeMetadata, recommendationChatId }))
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
    setShouldShowResults(false)
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
  const createRecommendationChat = async () => {
    const res = await API.createDiscoveryChat()
    localStorage.setItem('recommendationChatId', res.data.chat_id)
    navigate(`/${res.data.chat_id}`)
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
                      <img src={logo} className="icon-logo-vikinger small"/>

                    </div>

                    <h1 className="header-brand-text">BuilderPal</h1>

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
                          <p className="button secondary p-2" onClick={createRecommendationChat}>
                            <IoCreateOutline className='h-7 w-7' />
                          </p>

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
