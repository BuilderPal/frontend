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
      setTimeout(this.animateText.bind(this), 50); // 100ms delay
    }
  }

  render() {
    return <div className='w-full bg-gradient-to-r from-transparent via-[#000] to-transparent via-50% to-100% p-4 rounded-xl text-white'>
      <h2 className='text-3xl font-bold'>BuilderPal</h2>
      {this.state.text}
    </div>;
  }
}

export default TypingText;
