import { Component } from 'react';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TypingText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullText: this.props.history[this.props.history.length-1],
      text: '',
      currentIndex: 0,
      currentChat: this.props.history.length-1
    };
  }

  componentDidMount() {
    this.animateText();
  }

  changeCurrentChat(newCurrent) {
    this.setState({
      ...this.state,
      currentChat: newCurrent,
      text: this.props.history[newCurrent]
    });
  }

  animateText() {
    const { text, currentIndex } = this.state;

    if (currentIndex < this.state.fullText.length) {
      this.setState({
        text: text + this.state.fullText[currentIndex],
        currentIndex: currentIndex + 1,
      });

      // Add a delay between characters (adjust this as needed)
      setTimeout(this.animateText.bind(this), 50); // 50ms delay
    }
  }

  render() {
    return <div className='w-full px-4 py-2'>
      <h2 className='ms-4 rounded-t-lg text-xl font-medium bg-white/50 w-fit p-2'>BuilderPal</h2>
      <div className='bg-black/50 text-white border-[1px] border-white rounded-lg p-2'>
        <p>{this.state.text}</p>
        <br/>
        <div className='w-full text-center'>
          <FontAwesomeIcon
            className={`${this.state.currentChat === 0 && 'opacity-0'} cursor-pointer`}
            icon={faChevronLeft}
            onClick={() => this.changeCurrentChat(this.state.currentChat-1)}/>
          &nbsp;
          {this.state.currentChat+1}/{this.props.history.length}
          &nbsp;
          <FontAwesomeIcon
            className={`${this.state.currentChat === this.props.history.length-1 && 'opacity-0'} cursor-pointer`}
            icon={faChevronRight}
            onClick={() => this.changeCurrentChat(this.state.currentChat+1)}/>
        </div>
      </div>
    </div>;
  }
}

export default TypingText;
