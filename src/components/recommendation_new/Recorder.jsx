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
        <p className={`button ${isRecording ? 'warning' : 'primary'} padded`} onClick={isRecording ? discardRecording : startRecording}>
            {isRecording
              ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-[11px] w-[25px] h-[25px]">

                <path d="M10,20C4.477,20,0,15.523,0,10C0,4.478,4.477,0,10,0C15.522,0,20,4.478,20,10C20,15.523,15.522,20,10,20z M10,2c-4.418,0-8,3.582-8,8c0,4.418,3.582,8,8,8s8-3.582,8-8
                C18,5.582,14.418,2,10,2z M12.662,13.994L10,11.332l-2.662,2.662l-1.331-1.33l2.662-2.663L6.007,7.339l1.331-1.331L10,8.67l2.662-2.662l1.331,1.331l-2.662,2.662l2.662,2.663L12.662,13.994z"/>
    </svg>
                )
              : (
                    <img src={micImg} className="mt-[11px] w-[25px] h-[25px]"/>
                )}
        </p>

  )
}

export default Recorder
