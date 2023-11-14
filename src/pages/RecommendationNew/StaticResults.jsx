import React, { useEffect, useState, useRef } from 'react'
import '@dotlottie/player-component'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from 'components/ui/loader'
import StaticResult from 'components/recommendation_new/StaticResult'
import { API } from 'lib/utils'
import logo from 'styles/img/craft.png'
import Confetti from 'react-confetti'
const LIMIT = 6

export default function StaticResults () {
  const { chat_id: recommendationChatId, section_id: currIterationIndex } = useParams()
  const [staticSearchResults, setStaticSearchResults] = useState([])
  const [totalResults, setTotalResults] = useState(null)
  const [isLoadingStatic, setIsLoadingStatic] = useState(true)
  const [confettiDuration, setConfettiDuration] = useState(0)

  // useEffect to set up the interval
  useEffect(() => {
    // The interval function that decreases the countdown
    const intervalId = setInterval(() => {
      setConfettiDuration((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0))
    }, 1000)

    // Clear the interval on component unmount or when countdown hits 0
    return () => clearInterval(intervalId)
  }, [])

  // Function to reset the countdown
  const resetConfettiDuration = () => setConfettiDuration(5)

  const isMount = useRef(true)
  const navigate = useNavigate()
  useEffect(() => {
    isMount.current = true
    fetchStaticSearchResults(true, recommendationChatId, currIterationIndex, 0, LIMIT)
    return () => { isMount.current = false }
  }, [currIterationIndex])

  useEffect(() => {
    isMount.current = true
    fetchStaticSearchResults(true, recommendationChatId, 0, 0, LIMIT)
    return () => { isMount.current = false }
  }, [recommendationChatId])

  const fetchStaticSearchResults = async (toReplace, queryRecommendationChatId, queryIterationIndex, offset, limit) => {
    console.log('Fetching static search results', { currIterationIndex, queryIterationIndex, recommendationChatId, queryRecommendationChatId, isMount, toReplace, totalResults })
    if (!isMount.current) {
      return
    }
    if (!toReplace && totalResults != null && totalResults === staticSearchResults.length) {
      return
    }
    if (recommendationChatId !== queryRecommendationChatId || currIterationIndex !== queryIterationIndex || queryIterationIndex < 0) {
      return
    }
    if (toReplace) {
      setStaticSearchResults([])
    }
    setIsLoadingStatic(true)
    const { data: { is_section_registered: isReady, projects: resultsFetched, total_count: totalCountFetched } } = await API.getRecommendedStaticProjects(recommendationChatId, queryIterationIndex, offset, limit)

    if (isReady) {
      setStaticSearchResults((prevResults) => {
        if (recommendationChatId !== queryRecommendationChatId || queryIterationIndex < 0) {
          return prevResults
        }
        if (toReplace) {
          return resultsFetched
        } else {
          return [...prevResults.slice(0, offset), ...resultsFetched]
        }
      })
      setTotalResults(totalCountFetched)
      setIsLoadingStatic(false)
    } else {
      setTimeout(() => fetchStaticSearchResults(toReplace, queryRecommendationChatId, queryIterationIndex, offset, limit), 2000)
    }
  }
  const navigateToChat = () => {
    navigate(`/${recommendationChatId}`)
  }
  const navigateToProject = (id) => {
    navigate(`/project/${id}`)
  }
  return (
    <div className="builderpal">

      {
        isLoadingStatic
          ? <Loader />
          : (
            <>
              {confettiDuration ? <Confetti /> : <></>}
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

                    <h2 className="section-title">Handpicked Instructables Projects, Just for you</h2>

                  </div>

                </div>
                <div className="instructablepal-left">

                  <div className="chat-widget static">

                    <div className="chat-widget-messages">
                      <center><dotlottie-player
                        src="https://lottie.host/55efa82f-e290-4a81-9522-2a7bee940258/Pq4CESeIbR.json"
                        background="transparent"
                        speed="1"
                        style={{ width: '200px', height: '200px' }}
                        loop
                        autoplay
                      /></center>

                      <p className="starter-title-message">Did you know? I handpicked all these projects based on materials available at VIVISTOP. How cool is that!</p>
                      <button className="button medium primary starter" onClick={resetConfettiDuration}>Waaay cool!</button>
                      <button className="button medium primary starter" onClick={navigateToChat}>We should talk more</button>
                    </div>

                  </div>

                </div>
                <div className="instructablepal-right">
                  {
                    staticSearchResults.length > 0
                      ? (<>{
                        staticSearchResults.slice(0, 4).map((result, index) => (
                          <StaticResult {...result} selectProject={navigateToProject} key={index} />
                        ))
                      }
                        <div className="midway-checkpoint">
                          <p className="starter-title-message">What do you think of these projects I handpicked from Instructables for you?</p>
                          <button className="button medium primary starter" onClick={resetConfettiDuration}>They're awesome! ❤️❤️❤️</button>
                          <button className="button medium primary starter" onClick={navigateToChat}>Uh... maybe we should talk more</button>
                        </div>
                        {
                          staticSearchResults.slice(4).map((result, index) => (
                            <StaticResult {...result} selectProject={navigateToProject} key={index} />
                          ))
                        }</>)
                      : (
                        <div className="midway-checkpoint">
                          <p className="starter-title-message">I couldn't find any relevant projects</p>
                          <button className="button medium primary starter" onClick={navigateToChat}>Let's talk to find more projects</button>
                        </div>
                        )
                  }

                  {totalResults && totalResults > staticSearchResults.length ? <button className="button primary starter" onClick={() => fetchStaticSearchResults(false, recommendationChatId, currIterationIndex, staticSearchResults.length, LIMIT)}>Load More +</button> : <></>}
                </div>
              </div>
            </>
            )
      }
    </div>
  )
}
