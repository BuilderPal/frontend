import React from 'react'

export default function StaticResult ({ image, complexity, title, duration_in_minutes: duration, description, selectProject, _id: id }) {
  return (
        <div className="quest-item">

            <figure className="quest-item-cover liquid">
                <img src={image} alt="cover-01" />
            </figure>

            <p className="text-sticker">
                {complexity}
            </p>

            <div className="quest-item-info">

                <p className="quest-item-title">{title}</p>

                <p className="quest-esttime" style={{ display: 'flex', alignItems: 'center' }}>
                    <svg className="button-icon no-space icon-clock" style={{ marginRight: '5px' }} viewBox="0 0 20 20">
                        <path d="M10,0C4.486,0,0,4.485,0,9.999c0,5.515,4.486,10,10,10c5.514,0,10-4.485,10-10C20,4.485,15.514,0,10,0zM10,17.999c-4.414,0-8.005-3.589-8.005-8S5.586,2,10,2c4.414,0,8.005,3.588,8.005,7.999S14.414,17.999,10,17.999z M14.437,12.105l-3.44-1.724V4.999C10.997,4.447,10.551,4,10,4S9.002,4.447,9.002,4.999V11c0,0.379,0.213,0.725,0.551,0.894l3.99,2C13.687,13.966,13.838,14,13.988,14c0.367,0,0.719-0.203,0.894-0.554C15.128,12.953,14.929,12.352,14.437,12.105z" />

                    </svg> {duration} minutes</p>

                <p className="quest-item-text">{description}</p>

                <button className="button medium primary letstry" onClick={() => selectProject(id)}>Let's try this!</button>
            </div>

        </div>
  )
}
