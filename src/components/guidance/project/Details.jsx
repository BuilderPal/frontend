import React, { useEffect, useState } from 'react'
import { Badge } from 'components/ui/badge'
import { faClock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import project from 'assets/project/project-sample.png'
import InstructionPreview from 'components/guidance/project/InstructionPreview'
import ResourcePreview from 'components/guidance/project/ResourcePreview'
import { capitalise } from 'lib/utils'
import ImageCarousel from 'components/guidance/project/ImageCarousel'
import { Button } from 'components/ui/button'
import { IoIosArrowForward } from 'react-icons/io'
import { AiOutlineCheck } from 'react-icons/ai'

const Details = ({ navigateNext, title, description, complexity, duration_in_minutes: duration, resources, instructions, instructionIndex, setInstructionIndex, image, categories, userProjectId }) => {
  console.log(image)
  const [resourcesChecked, setResourcesChecked] = useState(resources.map((resource) => ({ resource, checked: false })))
  const toggleResourceChecked = (i) => {
    setResourcesChecked((prevResources) => {
      const { resource, checked } = prevResources?.[i]
      return [...prevResources.slice(0, i), { resource, checked: !checked }, ...prevResources.slice(i + 1)]
    })
  }
  useEffect(() => {
    const savedResourcesChecked = localStorage.getItem(`guidance_details_resources_${userProjectId}`)
    if (savedResourcesChecked) {
      setResourcesChecked(JSON.parse(savedResourcesChecked))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem(`guidance_details_resources_${userProjectId}`, JSON.stringify(resourcesChecked))
  }, [resourcesChecked])

  return (
    <div className=" max-w-xl mx-auto">
      <div className='grow p-3'>
        <div className="profile-header">

          <img src={image} alt="cover-01" className='object-cover w-full h-80' />

          <div className="profile-header-info pb-10 px-5">

            <div className="user-short-description big">

              <p className="user-short-description-title">{title}</p>

              <p className="user-short-description-text">{description}</p>

            </div>

            <div className="user-stats">

              <div className="user-stat big">

                <p className="user-stat-title">{complexity}</p>

                <p className="user-stat-text">Complexity</p>

              </div>

              <div className="user-stat big">

                <p className="user-stat-title">{duration} min</p>

                <p className="user-stat-text">Duration</p>

              </div>

              <div className="user-stat big">

                <p className="user-stat-title">{categories[0]}</p>

                <p className="user-stat-text">Category</p>

              </div>

            </div>

          </div>

        </div>
      </div>
      <div className='grow p-3'>

        <div className="widget-box">

          <p className="widget-box-title">Materials Needed</p>

          <div className="widget-box-content">

            {resourcesChecked.map(({ resource, checked }, i) => (
              <div className="checkbox-line pb-3" key={i}>
                <div className="checkbox-wrap" onClick={() => toggleResourceChecked(i)}>
                  <input type="checkbox" checked={checked}/>

                  <div className="checkbox-box">
                    {checked && <AiOutlineCheck color='white' />}
                  </div>

                  <label htmlFor="category-all">{resource}</label>
                </div>

              </div>
            ))}

          </div>
        </div>
      </div>
      <div className='grow p-3'>

        <div className="widget-box">

          <p className="widget-box-title">Steps Overview</p>

          <div className="widget-box-content">
            <div className="timeline-information-list">

              {instructions.map((instruction, i) => (

                <div className="timeline-information" key={i}>

                  <p className="timeline-information-title">{instruction.title}</p>

                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 px-4 py-2 flex justify-between z-10">
        <button className="button primary" onClick={() => navigateNext()}>
          Let's Start Building! <IoIosArrowForward className='ml-1' />
        </button>
      </div>
    </div>

  //   </div>
  //   {/*
  //   <h2 className='font-bold text-2xl mb-2 mt-6'>Instructions</h2>
  //   <div className='grid gap-4'>
  //     {instructions.map((instruction, i) =>
  //       <InstructionPreview
  //         key={i}
  //         instruction={instruction}
  //         instructionIndex={instructionIndex}
  //         setInstructionIndex={setInstructionIndex}
  //       />
  //     )}
  //   </div> */}
  // </div>

  )
}

export default Details
