import { Component } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

class VoiceRecorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      audioData: null,
    };
  }

  startRecording = () => {
    this.setState({ isRecording: true });
  };

  stopRecording = () => {
    this.setState({ isRecording: false });
  };

  onAudioData = (audioData) => {
    this.setState({ audioData });
  };

  render() {
    return (
      <div>
        <h1>Voice Recorder</h1>
        {this.state.isRecording ? (
          <button onClick={this.stopRecording}>Stop Recording</button>
        ) : (
          <button onClick={this.startRecording}>Start Recording</button>
        )}
        {this.state.audioData && (
          <audio controls>
            <source src={this.state.audioData} type="audio/wav" />
          </audio>
        )}
        <AudioRecorder
          record={this.state.isRecording}
          onStop={(data) => this.onAudioData(data.url)}
        />
      </div>
    );
  }
}

export default VoiceRecorder;
