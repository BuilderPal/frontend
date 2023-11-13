import React from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from 'lib/utils'

import 'css/vendor/bootstrap.min.css'
import 'css/styles.min.css'
import 'css/customstyle.css'
import '@dotlottie/player-component'
import rocket from 'img/landing/rocket.png'

const Home = () => {
  const navigate = useNavigate()

  const handleCreateChat = async () => {
    try {
      const res = await API.createDiscoveryChat()

      // Handle successful chat creation, e.g., redirect to the new chat page
      console.log('Chat created successfully!')

      // Redirect to the new chat page
      navigate(`/${res.data.chat_id}`)
    } catch (error) {
      console.error('Error creating chat:', error.message)
    }
  }
  return (
        // <!-- LANDING -->
        <div className="landing">
            {/* <!-- LANDING DECORATION --> */}
            <div className="landing-decoration"></div>
            {/* <!-- /LANDING DECORATION --> */}

            {/* <!-- LANDING INFO --> */}
            <div className="landing-info">
                {/* <!-- LOGO --> */}
                <div className="logo">
                    <dotlottie-player src="https://lottie.host/9758d09b-9bbf-4e6b-99ba-a007195abd3f/RQLyfykY9g.json" background="transparent" speed="1" style={{ height: '300px', width: '300px' }} loop autoplay></dotlottie-player>
                </div>
                {/* <!-- /LOGO --> */}
            </div>
            {/* <!-- /LANDING INFO --> */}

            {/* <!-- LANDING FORM --> */}
            <div className="landing-form">
                {/* <!-- FORM BOX --> */}
                <div className="form-box login-register-form-element">
                    {/* <!-- FORM BOX DECORATION --> */}
                    <img className="form-box-decoration" src={rocket} alt="rocket" />
                    {/* <!-- /FORM BOX DECORATION --> */}

                    {/* <!-- FORM BOX TITLE --> */}
                    {/* <!-- LANDING INFO PRETITLE --> */}
                    <h2 className="landing-info-pretitle">Welcome to</h2>
                    {/* <!-- /LANDING INFO PRETITLE --> */}

                    {/* <!-- LANDING INFO TITLE --> */}
                    <h1 className="landing-info-title">BUILDERPAL</h1>
                    <p>Your project buddy whose going to build something amaaazzzziiing together!<br /><br />Are you ready?</p>
                    {/* <!-- /LANDING INFO TITLE --> */}
                    {/* <!-- /FORM BOX TITLE -->     */}
                    <button className="button medium secondary" onClick={handleCreateChat}>Let&rsquo;s Go!</button>
                </div>
                {/* <!-- /FORM BOX --> */}
            </div>
            {/* <!-- /LANDING FORM --> */}
        </div>
  )
}

export default Home
