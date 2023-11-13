import React from 'react'
import questCompleteImage from 'styles/img/quest/completedq-s.png'
import badgeImage from 'styles/img/badge/bronze-b.png'
import { useNavigate } from 'react-router-dom'
// import badgeBannerImage from 'styles/img/banner/badges-icon.png'
export default function UserProjectCompletion () {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-around h-screen p-10">
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
