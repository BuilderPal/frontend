import React, { useState } from 'react'
import Dotdotdot from 'react-dotdotdot'

const searchResultSample = [
  {
    id: 'sample',
    duration_in_minutes: 120,
    complexity: 'Hard',
    resources: [
      'glue',
      'battery',
      '3D pen'
    ],
    views: 2504,
    favourited: 130,
    categories: [
      'handicraft'
    ],
    title: 'Wood Block Figurines',
    description: 'They look a bit like a hybrid between a LEGO minifig and a Funko Pop doll, but a wooden handmade version for those of us that like to create rather than buy.',
    image: 'https://content.instructables.com/FVL/6HHT/LND6U1U8/FVL6HHTLND6U1U8.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=42fed762a1f320e2edec63c845e04916'
  },
  {
    id: 'sample',
    duration_in_minutes: 120,
    complexity: 'Hard',
    resources: [
      'glue',
      'battery',
      '3D pen'
    ],
    views: 4500,
    favourited: 130,
    categories: [
      'handicraft'
    ],
    title: 'Wood Block Figurines',
    description: 'They look a bit like a hybrid between a LEGO minifig and a Funko Pop doll, but a wooden handmade version for those of us that like to create rather than buy.',
    image: 'https://content.instructables.com/FJV/AW2A/LNRH8BO4/FJVAW2ALNRH8BO4.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=e61d34712613b4c309069fd73d4e162d'
  },
  {
    id: 'sample',
    duration_in_minutes: 120,
    complexity: 'Hard',
    resources: [
      'glue',
      'battery',
      '3D pen'
    ],
    views: 200,
    favourited: 130,
    categories: [
      'handicraft'
    ],
    title: 'Wood Block Figurines',
    description: 'They look a bit like a hybrid between a LEGO minifig and a Funko Pop doll, but a wooden handmade version for those of us that like to create rather than buy.',
    image: 'https://content.instructables.com/FPJ/9Z1I/LNUC49ER/FPJ9Z1ILNUC49ER.png?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=362598a2f11f5e0ec9931998ea903e88'
  },
  {
    id: 'sample',
    duration_in_minutes: 120,
    complexity: 'Hard',
    resources: [
      'glue',
      'battery',
      '3D pen'
    ],
    views: 200,
    favourited: 130,
    categories: [
      'handicraft'
    ],
    title: 'Wood Block Figurines',
    description: 'They look a bit like a hybrid between a LEGO minifig and a Funko Pop doll, but a wooden handmade version for those of us that like to create rather than buy.',
    image: 'https://content.instructables.com/FPJ/9Z1I/LNUC49ER/FPJ9Z1ILNUC49ER.png?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=362598a2f11f5e0ec9931998ea903e88'
  }
]

export default function ContentArea ({ recommendationChatId }) {
  const [searchResults, setSearchResults] = useState(searchResultSample)
  const [dynamicSearchResults, setDynamicSearchResults] = useState(searchResultSample)

  return (
    <div className="flex flex-col p-4 w-2/3 overflow-y-auto">
      <div className="mb-4">
        <div className='text-2xl font-semi-bold tracking-tight mb-2'>See what BuilderPal came up with</div>
        <div className="flex flex-row overflow-x-auto">
          {dynamicSearchResults.map((result, index) => (
            <a href='www.google.com' key={index}>
              <div className="flex flex-col space-x-2 p-2 rounded-xl h-72 w-60">
                <div className="mx-2 mt-2 text-xl font-semibold text-ellipsis">{result.title}</div>
                <div className="mx-2 text-base text-gray-600">{result.complexity} • {result.views} views</div>
                <div className="flex-1 mx-2 mt-2 text-base leading-snug text-ellipsis text-gray-600">{result.description}</div>
              </div>
            </a>
          ))
          }
        </div>
        {/* Add "...or try out one of BuilderPal's suggestions!" text here */}
      </div>
      <div>
        <div className='text-2xl font-semi-bold tracking-tight mb-2'>...or try out one of BuilderPal's suggestions!</div>
        <div className="flex flex-col space-y-1">
          {searchResults.map((result, index) => (
            <a href='www.google.com' key={index}>
              <div className="flex space-x-2 p-2 rounded-xl">
                <div className='flex-shrink-0 h-52 w-80 relative bgslate-300'>
                  <img src={result.image} className='w-full h-full object-cover rounded-xl' />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded">
                    {result.duration_in_minutes} min
                  </div>
                </div>
                <div className='max-h-52'>
                  <div className="mx-2 mt-2 text-xl font-semibold text-ellipsis">{result.title}</div>
                  <div className="mx-2 text-base text-gray-600">{result.complexity} • {result.views} views</div>
                  <div className="mx-2 mt-1 text-base leading-snug text-ellipsis text-gray-600"><Dotdotdot clamp="auto">{result.description}</Dotdotdot></div>
                </div>
              </div>
            </a>
          ))
          }
        </div>
        {/* <div className="flex flex-row flex-wrap">
          {
            searchResults.map((result, index) => (
              <div className="basis-1/4 h-1/2 p-2 rounded-xl bg-slate-400" key={index}>
                <div className='relative w-full h-1/4 bgslate-300'>
                  <img src={result.image} className='w-full h-full object-cover rounded-xl' />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded">
                    {result.duration_in_minutes} min
                  </div>
                </div>

                <div className="mx-2 mt-2 text-lg font-bold">{result.title}</div>
                <div className="mx-2 text-base">{result.complexity} • {result.views} views</div>
              </div>
            ))
          }
        </div> */}
        {/* Add the suggestion cards with Title and Description here */}
      </div>
    </div>
  )
}
