import React, { useState, useCallback } from 'react';

const VoiceRecorder = ({ botIsGenerating, onSend }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState(null);

  const handleRecordingStart = () => {
    if (!botIsGenerating) {
      setIsRecording(true);
    }
  };

  const handleRecordingStop = (audioBlob) => {
    if (isRecording) {
      setIsRecording(false);
      setAudioData(audioBlob);
      // Here you would handle the audioBlob, perhaps uploading it to a server
      // and then you would probably want to reset the component state.
    }
  };

  // const handlers = useSwipeable({
  //   onSwipedLeft: () => {
  //     if (isRecording) {
  //       // Delete the recording or stop without saving
  //       setIsRecording(false);
  //       setAudioData(null);
  //     }
  //   },
  //   onSwipedUp: () => {
  //     if (isRecording && audioData) {
  //       // Send the recording
  //       setIsRecording(false);
  //       onSend({ audioFileLink: 'your-audio-link', audioBlob: audioData });
  //       setAudioData(null);
  //     }
  //   },
  //   trackMouse: true
  // });

  return (
    <></>
    // <div {...handlers}>
    //   <button
    //     onMouseDown={handleRecordingStart}
    //     onMouseUp={() => handleRecordingStop(audioData)}
    //     onTouchStart={handleRecordingStart}
    //     onTouchEnd={() => handleRecordingStop(audioData)}
    //     disabled={botIsGenerating || isRecording}
    //     style={{ backgroundColor: isRecording ? 'red' : 'gray' }}
    //   >
    //     {isRecording ? 'Recording...' : 'Hold to Record'}
    //   </button>
    //   {isRecording && <Recorder command="start" />}
    //   {!isRecording && audioData && <audio src={audioData} controls />}
    // </div>
  );
};

export default VoiceRecorder;
