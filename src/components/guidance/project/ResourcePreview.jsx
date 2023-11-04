import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'
import ResourceReporting from './ResourceReporting'
import React, { useState } from 'react'
import { Checkbox } from 'components/ui/checkbox'

const ResourcePreview = ({ resource }) => {
  const [isChecked, setIsChecked] = useState(false)
  return <>
  <div className="flex items-center rounded-lg p-4 hover:bg-slate-100">

      {/* <PopoverTrigger className={'flex w-full rounded-lg p-4 hover:bg-slate-100'}> */}
      <Checkbox
          checked={isChecked}
          onCheckedChange={() => setIsChecked(prev => !prev)}
        />
        <h3 className=' ml-3 text-xl my-auto'>{resource}</h3>
      {/* </PopoverTrigger> */}
      {/* <PopoverContent>
        <ResourceReporting resource={resource}/>
      </PopoverContent> */}
      </div>
    </>
}

export default ResourcePreview
