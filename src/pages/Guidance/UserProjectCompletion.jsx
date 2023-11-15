import React, { useState, useEffect } from 'react'
import questCompleteImage from 'styles/img/quest/completedq-s.png'
import badgeImage from 'styles/img/badge/bronze-b.png'
import { useNavigate } from 'react-router-dom'
import Confetti from 'react-confetti'

// import badgeBannerImage from 'styles/img/banner/badges-icon.png'
export default function UserProjectCompletion () {
  const navigate = useNavigate()
  const [confettiDuration, setConfettiDuration] = useState(5)

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
  return (
    <div className="flex flex-col justify-around h-screen p-10">
                    {confettiDuration ? <Confetti /> : <></>}

      <div>
        <p className="h2 text-center">Building Legend!</p>
        <p className="text-center">You've just completed your first project!</p>
      </div>
      <div className=" p-5 badge-item-stat mx-auto w-[450px]">
        {/* BADGE ITEM STAT IMAGE */}
        <img className="badge-item-stat-image" src={badgeImage} alt="Badge" />
        {/* BADGE ITEM STAT TITLE */}
        <p className="badge-item-stat-title">Happiness Ray</p>
        {/* BADGE ITEM STAT TEXT */}
        <p className="badge-item-stat-text">Create a project that brings happiness and joy to others!</p>

        <div className='badge-item-stat-text flex flex-row'>
          <img className=' h-9 w-9' src={questCompleteImage} />
          <p className="badge-item-stat-text badge-earned">
            Yay! You've earned this badge!
          </p>
        </div>

      </div>

      <button onClick={() => {
        console.log('clicked')
        navigate('/')
      }} className="button primary">Build more projects!</button>
    </div >
  )
}
