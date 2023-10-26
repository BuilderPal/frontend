import React from 'react'
import Chat from './Chat'
import SearchResults from './SearchResults'

const Recommendation = () => {
  return (
    <div className="flex h-screen">
        <Chat recommendationChatId={1}/>
        <SearchResults />
    </div>)
}

export default Recommendation
