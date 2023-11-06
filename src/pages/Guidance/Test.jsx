import React from 'react'
import badgesIcon from 'styles/img/banner/badges-icon.png' // Adjust the path as necessary
export default function Test () {
  return (
        <div className="section-banner">
      {/* SECTION BANNER ICON */}
      <img className="section-banner-icon" src={badgesIcon} alt="badges-icon" />
      {/* /SECTION BANNER ICON */}

      {/* SECTION BANNER TITLE */}
      <p className="section-banner-title">Badges</p>
      {/* /SECTION BANNER TITLE */}

      {/* SECTION BANNER TEXT */}
      <p className="section-banner-text">Check out all your unlocked and locked badges!</p>
      {/* /SECTION BANNER TEXT */}
    </div>
  )
}
