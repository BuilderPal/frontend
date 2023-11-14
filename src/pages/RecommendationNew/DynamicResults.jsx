import React, { useEffect, useState, useRef } from 'react'
import '@dotlottie/player-component'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from 'components/ui/loader'
import DynamicResult from 'components/recommendation_new/DynamicResult'
import { API } from 'lib/utils'
import logo from 'styles/img/craft.png'

const MAX_DYNAMIC_RESULTS = 10
const LIMIT = 4

export default function DynamicResults () {
  const { chat_id: recommendationChatId, section_id: currIterationIndex } = useParams()
  const [dynamicSearchResults, setDynamicSearchResults] = useState([])
  const [isLoadingDynamic, setIsLoadingDynamic] = useState(true)
  const isMount = useRef(true)
  const navigate = useNavigate()

  useEffect(() => {
    isMount.current = true
    if (currIterationIndex > 0) {
      fetchDynamicSearchResults(true, recommendationChatId, currIterationIndex, 0, LIMIT)
    }
    return () => { isMount.current = false }
  }, [currIterationIndex])

  useEffect(() => {
    isMount.current = true
    if (currIterationIndex > 0) {
      fetchDynamicSearchResults(true, recommendationChatId, 0, 0, LIMIT)
    }
    return () => { isMount.current = false }
  }, [recommendationChatId])

  const fetchDynamicSearchResults = async (toReplace, queryRecommendationChatId, queryIterationIndex, offset, limit) => {
    console.log('Fetching static search results')
    if (!isMount.current) {
      return
    }
    if (!toReplace && MAX_DYNAMIC_RESULTS <= dynamicSearchResults.length) {
      return
    }
    if (recommendationChatId !== queryRecommendationChatId || currIterationIndex !== queryIterationIndex || queryIterationIndex < 0) {
      return
    }
    if (toReplace) {
      setDynamicSearchResults([])
    }
    setIsLoadingDynamic(true)
    const { data: { is_section_registered: isReady, projects: resultsFetched } } = await API.getRecommendedDynamicProjects(recommendationChatId, queryIterationIndex, offset, limit)

    if (isReady) {
      setDynamicSearchResults((prevResults) => {
        if (recommendationChatId !== queryRecommendationChatId || queryIterationIndex < 0) {
          return prevResults
        }
        if (toReplace) {
          return resultsFetched
        } else {
          return [...prevResults.slice(0, offset), ...resultsFetched]
        }
      })
      setIsLoadingDynamic(false)
    } else {
      setTimeout(() => fetchDynamicSearchResults(toReplace, queryRecommendationChatId, queryIterationIndex, offset, limit), 2000)
    }
  }

  const navigateToChat = () => {
    navigate(`/${recommendationChatId}`)
  }
  const navigateToProject = (id) => {
    navigate(`/project/dynamic/${id}`)
  }
  return (
        <div className="builderpal">
            {
                isLoadingDynamic
                  ? <Loader />
                  : (
                        <>

                            <header className="header">

                                <div className="header-actions">

                                    <div className="header-brand">

                                        <div className="logo">

                                            <img src={logo} className="icon-logo-vikinger small" />

                                        </div>

                                        <h1 className="header-brand-text">BuilderPal</h1>

                                    </div>

                                </div>

                            </header>

                            <div className="content-grid">
                                <div className="section-header">

                                    <div className="section-header-info">

                                        <h2 className="section-title">Dream with BuilderPal!</h2>

                                    </div>

                                </div>
                                <div className="dreamerbuilderpal-left">

                                    <div className="chat-widget static">

                                        <div className="chat-widget-messages">
                                            <center><dotlottie-player
                                                src="https://lottie.host/ec48cdf6-8eab-45f2-bc4f-dc72f29445fd/wJEqvKaMYL.json"
                                                background="transparent"
                                                speed="1"
                                                style={{ width: '200px', height: '200px' }}
                                                loop
                                                autoplay
                                            /></center>

                                            <p className="starter-title-message">Here are some projects I dreamt up on the fly for you. Let me know what you think!</p>
                                            <button className="button medium primary starter">They're awesome! ❤️❤️❤️</button>
                                            <button className="button medium primary starter" onClick={navigateToChat}>Uh... maybe we should talk more</button>
                                        </div>

                                    </div>

                                </div>
                                <div className="dreamerbuilderpal-right">
                                  {
                                    dynamicSearchResults.length > 0
                                      ? (
                                      <>
                                      {
                                        dynamicSearchResults.slice(0, 4).map((result, index) => (
                                            <DynamicResult {...result} selectProject={navigateToProject} key={index} />
                                        ))
                                    }
                                    <div className="midway-checkpoint">
                                        <p className="starter-title-message">What do you think of these projects I handpicked from Instructables for you?</p>
                                        <button className="button medium primary starter">They're awesome! ❤️❤️❤️</button>
                                        <button className="button medium primary starter" onClick={navigateToChat}>Uh... maybe we should talk more</button>
                                    </div>
                                    {
                                        dynamicSearchResults.slice(4).map((result, index) => (
                                            <DynamicResult {...result} selectProject={navigateToProject} key={index} />
                                        ))
                                    }
                                    </>
                                        )
                                      : (
                                      <div className="midway-checkpoint">
                                        <p className="starter-title-message">I couldn't find any relevant projects...</p>
                                        <button className="button medium primary starter" onClick={navigateToChat}>Let's talk to find more projects</button>
                                    </div>
                                        )
                                  }
                {dynamicSearchResults.length < MAX_DYNAMIC_RESULTS && (<button className="button primary starter" onClick={() => fetchDynamicSearchResults(false, recommendationChatId, currIterationIndex, dynamicSearchResults.length, LIMIT)}>Load More +</button>)}

                                </div>
                            </div>
                        </>)
            }
        </div>
  )
}
