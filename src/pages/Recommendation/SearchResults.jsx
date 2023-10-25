import React from 'react'

function ContentArea () {
  return (
    <div className="flex flex-col p-4 w-2/3 bg-white">
      <div className="mb-4">
        {/* Add "See what other Vivanauts have built!" text here */}
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Add the content cards with Title and Description here */}
      </div>
      <div className="mb-4">
        {/* Add "...or try out one of BuilderPal's suggestions!" text here */}
      </div>
      <div className="flex flex-wrap gap-4">
        {/* Add the suggestion cards with Title and Description here */}
      </div>
    </div>
  )
}

export default ContentArea
