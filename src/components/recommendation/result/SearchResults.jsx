import React, { useState, useEffect, useRef } from 'react'
import { API } from '../../../lib/utils'
import { ClipLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import { Button } from 'components/ui/button'
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

const MAX_DYNAMIC_RESULTS = 10
const LIMIT = 5

export default function ContentArea({ recommendationChatId, currIterationIndex }) {
  const [staticSearchResults, setStaticSearchResults] = useState([])
  const [dynamicSearchResults, setDynamicSearchResults] = useState([])
  const [totalResults, setTotalResults] = useState(null)
  const [isLoadingStatic, setIsLoadingStatic] = useState(true)
  const [isLoadingDynamic, setIsLoadingDynamic] = useState(true)
  const isMount = useRef(true)
  useEffect(() => {
    isMount.current = true
    fetchStaticSearchResults(true, recommendationChatId, currIterationIndex, 0, LIMIT)
    if (currIterationIndex > 0) {
      fetchDynamicSearchResults(true, recommendationChatId, currIterationIndex, 0, LIMIT)
    }
    return () => { isMount.current = false }
  }, [recommendationChatId, currIterationIndex])

  const fetchStaticSearchResults = async (toReplace, queryRecommendationChatId, queryIterationIndex, offset, limit) => {
    console.log('Fetching static search results')
    if (!isMount.current) {
      return
    }
    if (!toReplace && totalResults != null && totalResults === staticSearchResults.length) {
      return
    }
    if (recommendationChatId !== queryRecommendationChatId || currIterationIndex !== queryIterationIndex || queryIterationIndex < 0) {
      return
    }
    setIsLoadingStatic(true)
    const { data: { is_section_registered: isReady, projects: resultsFetched, total_count: totalCountFetched } } = await API.getRecommendedStaticProjects(recommendationChatId, queryIterationIndex, offset, limit)

    if (isReady) {
      setStaticSearchResults((prevResults) => {
        if (recommendationChatId !== queryRecommendationChatId || queryIterationIndex < 0) {
          return prevResults
        }
        if (toReplace) {
          return resultsFetched
        } else {
          return [...prevResults.slice(0, offset), ...resultsFetched]
        }
      })
      setTotalResults(totalCountFetched)
      setIsLoadingStatic(false)
    } else {
      setTimeout(() => fetchStaticSearchResults(toReplace, queryRecommendationChatId, queryIterationIndex, offset, limit), 2000)
    }
  }

  const fetchDynamicSearchResults = async (toReplace, queryRecommendationChatId, queryIterationIndex, offset, limit) => {
    console.log('Fetching static search results')
    if (!isMount.current) {
      return
    }
    if (!toReplace && totalResults != null && totalResults === dynamicSearchResults.length) {
      return
    }
    if (recommendationChatId !== queryRecommendationChatId || currIterationIndex !== queryIterationIndex || queryIterationIndex < 0) {
      return
    }
    setIsLoadingDynamic(true)
    const { data: { is_section_registered: isReady, projects: resultsFetched } } = await API.getRecommendedDynamicProjects(recommendationChatId, queryIterationIndex, offset, limit)

    if (isReady) {
      setDynamicSearchResults((prevResults) => {
        if (recommendationChatId !== queryRecommendationChatId || queryIterationIndex < 0) {
          return prevResults
        }
        if (toReplace) {
          return resultsFetched
        } else {
          return [...prevResults.slice(0, offset), ...resultsFetched]
        }
      })
      setIsLoadingDynamic(false)
    } else {
      setTimeout(() => fetchDynamicSearchResults(toReplace, queryRecommendationChatId, queryIterationIndex, offset, limit), 2000)
    }
  }

  return (
    <div className="flex flex-col p-4 w-2/3 overflow-y-auto">
      {currIterationIndex > 0 && (<div className="mb-4">
        <div className='text-2xl font-semi-bold tracking-tight mb-2'>See what BuilderPal came up with</div>
        <div className="flex flex-row overflow-x-auto">
          <>
            {dynamicSearchResults.map((result, index) => (
              <Link to={`/project/dynamic/${result._id}`} key={index}>
                <div className="flex flex-col space-x-2 p-2 rounded-xl h-72 w-60">
                  <div className="mx-2 mt-2 text-xl font-semibold text-ellipsis">{result.title}</div>
                  <div className="mx-2 text-base text-gray-600">{result.complexity}</div>
                  <div className="flex-1 mx-2 mt-2 text-base leading-snug text-ellipsis text-gray-600">{result.description}</div>
                </div>
              </Link>
            ))
            }
            {
              isLoadingDynamic
                ? <ClipLoader isLoading={isLoadingDynamic} />
                : (dynamicSearchResults.length < MAX_DYNAMIC_RESULTS && (<Button onClick={() => fetchDynamicSearchResults(false, recommendationChatId, currIterationIndex, dynamicSearchResults.length, LIMIT)}>Load More +</Button>))}
          </>
        </div>
        {/* Add "...or try out one of BuilderPal's suggestions!" text here */}
      </div>)}
      <div>
        <div className='text-2xl font-semi-bold tracking-tight mb-2'>...or try out one of BuilderPal's suggestions!</div>
        <div className="flex flex-col space-y-1">
          {staticSearchResults.map((result, index) => (
            <Link to={`/project/${result._id}`} key={index}>
              <div className="flex space-x-2 p-2 rounded-xl">
                <div className='flex-shrink-0 h-52 w-80 relative bgslate-300'>
                  <img src={result.image} className='w-full h-full object-cover rounded-xl' />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded">
                    {result.duration_in_minutes} min
                  </div>
                </div>
                <div className='max-h-52'>
                  <div className="mx-2 mt-2 text-xl font-semibold text-ellipsis">{result.title}</div>
                  <div className="mx-2 text-base text-gray-600">{result.complexity}</div>
                  <div className="mx-2 mt-1 text-base leading-snug text-ellipsis text-gray-600">{result.description}</div>
                </div>
              </div>
            </Link>
          ))
          }
          {
            isLoadingStatic
              ? <ClipLoader isLoading={isLoadingStatic} />
              : (totalResults && totalResults > staticSearchResults.length && <Button onClick={() => fetchStaticSearchResults(false, recommendationChatId, currIterationIndex, staticSearchResults.length, LIMIT)}>Load More +</Button>)}
        </div>
      </div>
    </div>
  )
}
