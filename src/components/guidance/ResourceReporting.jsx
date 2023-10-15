import { Component } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import { Button } from 'components/ui/button';

class ResourceReporting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Card>
      <CardHeader>
        <CardTitle>{this.props.resource}</CardTitle>
        <CardDescription className='text-black'>Any problems with using <span className='font-bold'>{this.props.resource}</span>?</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant='accent' className='w-full'>I don't have it!</Button>
        <Button variant='accent' className='w-full mt-4'>I can't use it!</Button>
      </CardContent>
    </Card>;
  }
}

export default ResourceReporting;