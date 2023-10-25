import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import ResourceReporting from './ResourceReporting';
import React from 'react'

const ResourcePreview = ({resource}) => {
  return <Popover>
      <PopoverTrigger className={`flex w-full bg-nusb-light rounded-lg p-4 hover:bg-nusb-v-light`}>
        <h3 className='text-lg my-auto'>{resource}</h3>
      </PopoverTrigger>
      <PopoverContent>
        <ResourceReporting resource={resource}/>
      </PopoverContent>
    </Popover>;
}

export default ResourcePreview;
