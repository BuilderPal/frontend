import { Component } from 'react';

class TypingText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      currentIndex: 0,
    };
  }

  componentDidMount() {
    this.animateText();
  }

  animateText() {
    const { text, currentIndex } = this.state;
    const fullText = this.props.text;

    if (currentIndex < fullText.length) {
      this.setState({
        text: text + fullText[currentIndex],
        currentIndex: currentIndex + 1,
      });

      // Add a delay between characters (adjust this as needed)
      setTimeout(this.animateText.bind(this), 50); // 50ms delay
    }
  }

  render() {
    return <div
      className='w-full bg-gradient-to-r from-transparent via-[#000]/40 to-transparent via-50% to-100% p-4 rounded-xl text-white bg-blend-screen'
      >
      <h2 className='text-xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>BuilderPal</h2>
      <p className='drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>{this.state.text}</p>
    </div>;
  }
}

export default TypingText;
