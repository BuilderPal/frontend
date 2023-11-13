import React from 'react'

export default function ResultNavigation ({ navigateToDynamicResults, navigateToStaticResults }) {
  return (
        <div className="chat-widget-speaker right">

            <button className="button medium primary mid-dialogue" onClick={navigateToStaticResults}>Show me related projects from Instructables</button>
            <button className="button medium primary mid-dialogue" onClick={navigateToDynamicResults}>Dream up some projects for me!</button>

        </div>
  )
}
