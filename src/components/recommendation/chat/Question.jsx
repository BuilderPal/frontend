import React from 'react'

export default function Question ({ question, emotion }) {
  return (
    <div className="flex items-end justify-start">
      <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-10 h-10 rounded-full order-2" />
      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
        <span className="p-4 rounded-lg inline-block rounded-bl-none bg-blue-600 text-white text-lg">
          {question}
        </span>
      </div>
    </div>
  )
}
