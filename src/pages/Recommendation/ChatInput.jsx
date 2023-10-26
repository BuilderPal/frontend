import React, { useState } from 'react'
import Recorder from 'components/chat/Recorder'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'

export default function ChatInput ({ sendTextMessage, sendAudioMessage }) {
  const [currMessage, setCurrMessage] = useState('')
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState(null)
  const isAudioActive = isRecording || recordedBlob
  const sendMessage = async () => {
    setIsAwaitingResponse(true)
    // Depending on audio or text, send the Text of Audio Message
    if (recordedBlob) {
      await sendAudioMessage(recordedBlob)
    } else {
      await sendTextMessage(currMessage)
    }
    setIsAwaitingResponse(false)
  }
  return (
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <div className="flex items-center transition-all duration-500 ease-in-out">
                {/* Audio Component */}
                <div className={`flex-shrink-0 ${isAudioActive ? 'flex-grow' : 'w-12'} m-1`}>
                    <Recorder recordedBlob={recordedBlob} setRecordedBlob={setRecordedBlob} setIsRecording={setIsRecording} isRecording={isRecording} />
                </div>

                {/* Input Component */}
                {!isAudioActive && (
                    <div className="flex-grow p-4">
                        <Input disabled={isAwaitingResponse} value={currMessage} onChange={(e) => { setCurrMessage(e.target.value) }} type="text" placeholder="Write your message!" />
                    </div>
                )}

                {/* Button Component */}
                <button className="flex-shrink-0p-4">
                    <Button disabled={isAwaitingResponse} onClick={sendMessage} type="button" className="items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none disabled:bg-slate-400">
                        <span className="font-bold">Send</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                    </Button>
                </button>
            </div>
        </div>
  )
}
