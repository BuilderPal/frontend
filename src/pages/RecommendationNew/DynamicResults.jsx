import React, { useEffect, useState, useRef } from 'react'
import '@dotlottie/player-component'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from 'components/ui/loader'
import DynamicResult from 'components/recommendation_new/DynamicResult'
import { API } from 'lib/utils'
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
