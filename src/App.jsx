import { Component } from 'react';
import './globals.css';
import { Guidance } from './pages/Guidance';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Guidance/>;
  }
}

export default App;