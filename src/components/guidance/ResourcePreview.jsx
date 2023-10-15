import { Component } from 'react';

class ResourcePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className='flex w-full bg-nusb-light rounded-lg p-4'>
      <h3 className='text-lg my-auto'>{this.props.resource}</h3>
    </div>;
  }
}

export default ResourcePreview;