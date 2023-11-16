// src/components/Recorder.js
import React, { useState, useRef } from 'react'
import { BsFillStopFill } from 'react-icons/bs'
import micImg from 'styles/img/builderpal/whitemic50.png'

import { AiOutlineRedo } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx'
const Recorder = ({ isRecording, setIsRecording, mediaRecorder, setRecordedBlob, sendAudioMessageWrapper }) => {
  const [duration, setDuration] = useState(0)
  const interval = useRef(null)
  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      mediaRecorder.current = new MediaRecorder(stream)
      mediaRecorder.current.ondataavailable = event => {
        setRecordedBlob(event.data)
        sendAudioMessageWrapper(event.data)
      }
      mediaRecorder.current.onstop = () => {
        mediaRecorder.current.stream.getTracks().forEach(track => track.stop())
        clearInterval(interval.current)
        setDuration(0)
      }
      mediaRecorder.current.start()

      interval.current = setInterval(() => {
        setDuration(prev => prev + 1)
      }, 1000)

      setIsRecording(true)
    })
  }

  const discardRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.ondataavailable = null
      mediaRecorder.current.stop()
      setIsRecording(false)
    }
    setRecordedBlob(null)
    setDuration(0)
  }

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop()
      setIsRecording(false)
    }
  }

  const resetRecording = () => {
    setRecordedBlob(null)
    setDuration(0)
    startRecording()
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  return (
        <p className={`button ${isRecording ? 'warning' : 'primary'} px-3`} onClick={isRecording ? discardRecording : startRecording}>
            {isRecording
              ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-[11px] w-[25px] h-[25px]">

                <path d="M10,20C4.477,20,0,15.523,0,10C0,4.478,4.477,0,10,0C15.522,0,20,4.478,20,10C20,15.523,15.522,20,10,20z M10,2c-4.418,0-8,3.582-8,8c0,4.418,3.582,8,8,8s8-3.582,8-8
                C18,5.582,14.418,2,10,2z M12.662,13.994L10,11.332l-2.662,2.662l-1.331-1.33l2.662-2.663L6.007,7.339l1.331-1.331L10,8.67l2.662-2.662l1.331,1.331l-2.662,2.662l2.662,2.663L12.662,13.994z"/>
    </svg>
                )
              : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="mt-[11px] w-[25px] h-[25px]" >
                    <g>
    <g>
                <path d="m439.5,236c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,70-64,126.9-142.7,126.9-78.7,0-142.7-56.9-142.7-126.9 0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,86.2 71.5,157.4 163.1,166.7v57.5h-23.6c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h88c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-23.6v-57.5c91.6-9.3 163.1-80.5 163.1-166.7z"/>
                <path d="m256,323.5c51,0 92.3-41.3 92.3-92.3v-127.9c0-51-41.3-92.3-92.3-92.3s-92.3,41.3-92.3,92.3v127.9c0,51 41.3,92.3 92.3,92.3zm-52.3-220.2c0-28.8 23.5-52.3 52.3-52.3s52.3,23.5 52.3,52.3v127.9c0,28.8-23.5,52.3-52.3,52.3s-52.3-23.5-52.3-52.3v-127.9z"/>
                </g>
                </g>
                </svg>
                )}

        </p>

  )
}

export default Recorder
