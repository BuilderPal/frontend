import React from 'react'

const ChatMessage = ({ isUser, messages }) => {
  return (
        <>
            {
                isUser
                  ? (<div className="chat-message">
                    <div className="flex items-end justify-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                            {messages.map((message, index) => (
                                <div key={index}>
                                    <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                                        {message}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-2" />
                    </div>
                </div>)
                  : (
                    <div className="chat-message">
                        <div className="flex items-end">
                            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                {messages.map((message, index) => (
                                    <div key={index}>
                                        <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                                            {message}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
                        </div>
                    </div>
                    )
            }
        </>
  )
}
export default ChatMessage
