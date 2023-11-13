import React from 'react'

import easyImg from 'styles/img/quest/cover/01.png'
import mediumImg from 'styles/img/quest/cover/02.png'
import hardImg from 'styles/img/quest/cover/03.png'
import easyItemImg from 'styles/img/builderpal/dreamidea.png'
import mediumItemImg from 'styles/img/quest/completedq-b.png'
import hardItemImg from 'styles/img/quest/openq-b.png'

export default function DynamicResult ({ complexity, title, description, selectProject, _id: id }) {
  const getCoverImage = (complexity) => {
    const complexityNorm = complexity.trim().toLowerCase()
    if (complexityNorm === 'easy') {
      return easyImg
    } else if (complexityNorm === 'medium') {
      return mediumImg
    } else {
      return hardImg
    }
  }
  const getItemImage = () => {
    const complexityNorm = complexity.trim().toLowerCase()
    if (complexityNorm === 'easy') {
      return easyItemImg
    } else if (complexityNorm === 'medium') {
      return mediumItemImg
    } else {
      return hardItemImg
    }
  }
  return (
    <div className="quest-item">

    <figure className="quest-item-cover liquid">
        <img src={getCoverImage(complexity)}/>
    </figure>

    <p className="text-sticker">
        {complexity}
    </p>

    <div className="quest-item-info">

        <div className="quest-item-badge">
            <img src={getItemImage(complexity)} />
        </div>

        <p className="quest-item-title">{title}</p>

        <p className="quest-item-text">{description}</p>

        <button className="button medium primary letstry" onClick={() => selectProject(id)}>Let's try this!</button>
    </div>

</div>

  )
}
