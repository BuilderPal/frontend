import React from 'react'
import { API } from 'lib/utils'

import '@dotlottie/player-component'
import rocketImg from 'styles/img/landing/rocket.png'
import { useNavigate } from 'react-router-dom'
export default function Landing () {
  const nav = useNavigate()
  const createRecommendationChat = async () => {
    const res = await API.createDiscoveryChat()
    localStorage.setItem('recommendationChatId', res.data.chat_id)
    console.log('Landing created chat', res.data.chat_id, localStorage.getItem('recommendationChatId'))
    nav(`/${res.data.chat_id}`)
  }
  return (
        <div className="builderpal">

            <div className="landing">

                <div className="landing-decoration"></div>

                <div className="landing-info">

                    <div className="logo"><dotlottie-player
                        src="https://lottie.host/9758d09b-9bbf-4e6b-99ba-a007195abd3f/RQLyfykY9g.json"
                        background="transparent"
                        speed="1"
                        style={{ width: '300px', height: '300px' }}
                        loop
                        autoplay
                    />

                    </div>

                </div>

                <div className="landing-form">

                    <div className="form-box login-register-form-element">

                        <img className="form-box-decoration" src={rocketImg} alt="rocket" />

                        <h2 className="landing-info-pretitle">Welcome to</h2>

                        <h1 className="landing-info-title">BUILDERPAL</h1>
                        <p>Your project buddy whose going to build something amaaazzzziiing together!<br /><br />
                            Are you ready?</p>

                        <button className="button medium primary" onClick={createRecommendationChat}>Let's Go!</button>
                    </div>

                </div>

            </div>
        </div>
  )
}
