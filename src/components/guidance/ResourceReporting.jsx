import { Component } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import { Button } from 'components/ui/button';

const ResourceReporting = ({resource}) => {
  return <Card>
      <CardHeader>
        <CardTitle>{resource}</CardTitle>
        <CardDescription className='text-black'>Any problems with using <span className='font-bold'>{resource}</span>?</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant='accent' className='w-full'>I don't have it!</Button>
        <Button variant='accent' className='w-full mt-4'>I can't use it!</Button>
      </CardContent>
    </Card>;
}

export default ResourceReporting;
