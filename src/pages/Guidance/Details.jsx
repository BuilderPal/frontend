import { Component } from 'react';
import { Badge } from 'components/ui/badge';
import { faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import project from 'assets/project/project-sample.png';
import InstructionPreview from 'components/guidance/InstructionPreview';
import ResourcePreview from 'components/guidance/ResourcePreview';
import { capitalise } from 'lib/utils';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className='text-white w-full overflow-y-auto mb-4'>
      <img src={project} alt='project' className='mx-auto max-w-xl'/>

      <h2 className='font-bold text-white text-2xl mb-2 mt-6'>{this.props.title}</h2>
      <p className='mb-2'>{this.props.description}</p>
      <Badge variant={this.props.complexity}><FontAwesomeIcon icon={faUser}/>&nbsp;Difficulty: {capitalise(this.props.complexity)}</Badge>
      &nbsp;
      <Badge variant='secondary'><FontAwesomeIcon icon={faClock}/>&nbsp;Estimated Time: {this.props.duration_in_minutes}min</Badge>

      <h2 className='font-bold text-white text-2xl mb-2 mt-6'>Materials Needed</h2>
      <div className='grid gap-4'>
        {this.props.resources.map((resource, i) =>
          <ResourcePreview
            key={i}
            resource={resource}
            />
        )}
      </div>

      <h2 className='font-bold text-white text-2xl mb-2 mt-6'>Instructions</h2>
      <div className='grid gap-4'>
        {this.props.instructions.map((instruction, i) =>
          <InstructionPreview
            key={i}
            instruction={instruction}
            current={this.props.current}
            changeCurrentInstruction={this.props.changeCurrentInstruction}
            />
        )}
      </div>
    </div>;
  }
}

export default Details;