import { Component } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import ResourceReporting from './ResourceReporting';

class ResourcePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Popover>
      <PopoverTrigger className={`flex w-full bg-nusb-light rounded-lg p-4 hover:bg-nusb-v-light`}>
        <h3 className='text-lg my-auto'>{this.props.resource}</h3>
      </PopoverTrigger>
      <PopoverContent>
        <ResourceReporting resource={this.props.resource}/>
      </PopoverContent>
    </Popover>;
  }
}

export default ResourcePreview;