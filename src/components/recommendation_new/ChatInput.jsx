import React, { useState } from 'react'
import Recorder from 'components/guidance/chat/Recorder'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { RxCross1 } from 'react-icons/rx'
import micImg from 'styles/img/builderpal/whitemic50.png'

export default function ChatInput ({ sendTextMessage, sendAudioMessage }) {
  const [currMessage, setCurrMessage] = useState('')
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState(null)
  const isAudioActive = isRecording || recordedBlob
  const sendMessage = async () => {
    if (!currMessage && !recordedBlob) {
      return
    }
    setIsAwaitingResponse(true)

    const message = currMessage
    const blob = recordedBlob
    setCurrMessage('')
    setRecordedBlob(null)

    if (blob) {
      await sendAudioMessage(recordedBlob)
    } else {
      await sendTextMessage(message)
    }
    setIsAwaitingResponse(false)
  }
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Call the function you want to run
      sendMessage()
    }
  }
  return (
    <form className="chat-widget-form" onSubmit={(e) => { e.preventDefault() }}>

        <div className="form-row split">

            <div className="form-item input-container">

                <div className="interactive-input small">
                    <input disabled={isAwaitingResponse} value={currMessage} onChange={(e) => { setCurrMessage(e.target.value) }} onKeyPress={onKeyPress} type="text" id="chat-widget-message-text-2" name="chat_widget_message_text_2" placeholder="Write a message..." />

                    <div className="interactive-input-action">

                        <RxCross1 />

                    </div>

                </div>

            </div>

            <div className="flex form-item auto-width space-x-1">

                <p className="button primary padded" disabled={isAwaitingResponse} onClick={sendMessage}>

                    <svg className="button-icon no-space icon-send-message mt-[12px]">
                        <path d="M19.993,0.94c-0.005-0.091-0.022-0.179-0.052-0.265c-0.011-0.031-0.021-0.062-0.035-0.093  c-0.049-0.107-0.109-0.208-0.195-0.294s-0.188-0.147-0.294-0.195c-0.031-0.014-0.062-0.024-0.093-0.035c-0.086-0.03-0.173-0.046-0.263-0.052C19.034,0.005,19.009,0,18.981,0c-0.104,0.002-0.207,0.017-0.308,0.052L0.67,6.353C0.283,6.488,0.018,6.846,0.001,7.256C-0.016,7.666,0.22,8.044,0.594,8.21l7.75,3.446l3.444,7.75C11.948,19.769,12.308,20,12.702,20
    c0.014,0,0.027,0,0.041-0.002c0.409-0.016,0.768-0.28,0.903-0.668l6.302-18.003c0.035-0.101,0.05-0.206,0.052-0.309C20,0.991,19.994,0.967,19.993,0.94z M15.197,3.388L8.88,9.706L3.711,7.408L15.197,3.388z M12.592,16.288l-2.298-5.169l6.317-6.316L12.592,16.288z"/>

                    </svg>

                </p>
                <p className="button primary padded">
                    <img src={micImg} className="mt-[11px] w-[25px] h-[25px]" />
                </p>

            </div>

        </div>

    </form>
  // <div className="border-t-2 border-gray-200 pt-4 mb-2 sm:mb-0">
  //     <div className="flex items-center transition-all duration-500 ease-in-out">
  //         {/* Audio Component */}
  //         <div className={`flex-shrink-0 ${isAudioActive ? 'flex-grow' : 'w-8'} m-1`}>
  //             <Recorder recordedBlob={recordedBlob} setRecordedBlob={setRecordedBlob} setIsRecording={setIsRecording} isRecording={isRecording} />
  //         </div>

  //         {/* Input Component */}
  //         {!isAudioActive && (
  //             <div className="flex-grow pl-1 pr-2">
  //                 <Input disabled={isAwaitingResponse} value={currMessage} onChange={(e) => { setCurrMessage(e.target.value) }} type="text" placeholder="Write your message!" onKeyPress={onKeyPress} />
  //             </div>
  //         )}

  //         {/* Button Component */}
  //             <Button disabled={isAwaitingResponse} onClick={sendMessage} type="button" className="w-24 items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none disabled:bg-slate-400">
  //                 <span className="font-bold">Send</span>
  //                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
  //                     <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
  //                 </svg>
  //             </Button>
  //     </div>
  // </div>
  )
}
