import React from 'react'

export default function Suggestion ({ suggestion, sendSuggestion }) {
  return (
        <div className="chat-widget-speaker right">
            <button className="button medium primary mid-dialogue" onClick={() => sendSuggestion(suggestion.description)}>{suggestion.title}</button>
        </div>
  )
}
