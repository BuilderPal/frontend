// src/components/Recorder.js
import React, { useState, useRef, useEffect } from 'react';
import { BsFillStopFill, BsFillRecordCircleFill } from "react-icons/bs"

import { AiOutlineRedo } from "react-icons/ai"
import { RxCross2 } from "react-icons/rx"
const Recorder = ({isRecording, setIsRecording, setRecordedBlob, recordedBlob }) => {
  const [duration, setDuration] = useState(0);
  const mediaRecorder = useRef(null);
  const interval = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = event => {
        setRecordedBlob(event.data);
      };
      mediaRecorder.current.start();

      interval.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);

      setIsRecording(true);
    });
  };

  const resetState = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.ondataavailable = null
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      clearInterval(interval.current);
      setIsRecording(false);
    }
    setRecordedBlob(null)
    setDuration(0);
  }

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      clearInterval(interval.current);
      setIsRecording(false);
    }
  };

  const resetRecording = () => {
    setRecordedBlob(null);
    setDuration(0);
    startRecording();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="flex justify-between">
      {
        recordedBlob ? (
          <>
            <button onClick={resetState} type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"><RxCross2 className="h-8 w-8"/></button>
            <button onClick={resetRecording} className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"><AiOutlineRedo className="h-8 w-8"/></button>
            <div className='flex-1'>
              <audio controls src={URL.createObjectURL(recordedBlob)} className="w-full" />
            </div>
          </>
        ) : isRecording ? (
          <div className='flex'>
            <button onClick={resetState} className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"><RxCross2 className="h-8 w-8"/></button>
            <button onClick={stopRecording} className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"><BsFillStopFill className="h-8 w-8"/></button>
            <span className="inline-flex items-center justify-center rounded-full h-12 w-12">{formatTime(duration)}</span>
          </div>
        ) : (
          <>
            <button onClick={startRecording} type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
              </svg>
            </button>
          </>
        )
      }
    </div>
  )
};

export default Recorder;
