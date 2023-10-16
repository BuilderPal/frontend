import { Component } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import { Separator } from 'components/ui/separator';
import Details from './Details';
import Instruction from './Instruction';
import Chat from './Chat';
import API from '../../lib/utils'; // You should import the API class

class Guidance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      title: 'Sample Project Title',
      duration_in_minutes: 60,
      complexity: 'high',
      resources: ['Resource A', 'Resource B'],
      categories: ['Category A', 'Category B'],
      description: 'This is a description of the sample project.',
      instructions: [
        {
          instruction_index: 0,
          title: 'Start with a Diamond',
          body: [
            'First, begin with a diamond piece of copy paper',
            'I have outlined the edges of my paper in blue to make it easier.',
            '(TO MAKE A SQUARE: You can make a square from a rectangular piece.)',
            'I usually make two snowflakes for every 8.5"x11" piece of paper.'
          ],
          images: [
            'https://content.instructables.com/FY2/WTVT/KFWJO05V/FY2WTVTKFWJO05V.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=0889d7a436a4385d133da7232be78fe9',
            'https://content.instructables.com/FA5/85WW/KFQTVHPK/FA585WWKFQTVHPK.jpg?auto=webp&frame=1&fit=bounds&md=b311f18cf945ecf2ba6602a84449b86a'
          ]
        },
        {
          instruction_index: 1,
          title: 'Start with a Square',
          body: [
            'First, begin with a square piece of copy paper',
            'I have outlined the edges of my paper in blue to make it easier.',
            '(TO MAKE A SQUARE: You can make a square from a rectangular piece.)',
            'I usually make two snowflakes for every 8.5"x11" piece of paper.'
          ],
          images: [
            'https://content.instructables.com/FY2/WTVT/KFWJO05V/FY2WTVTKFWJO05V.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=0889d7a436a4385d133da7232be78fe9'
          ]
        },
        {
          instruction_index: 2,
          title: 'Start with a Circle',
          body: [
            'First, begin with a circle piece of copy paper',
            'I have outlined the edges of my paper in blue to make it easier.',
            '(TO MAKE A SQUARE: You can make a square from a rectangular piece.)',
            'I usually make two snowflakes for every 8.5"x11" piece of paper.'
          ],
          images: [
            'https://content.instructables.com/FY2/WTVT/KFWJO05V/FY2WTVTKFWJO05V.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=0889d7a436a4385d133da7232be78fe9'
          ]
        }
      ],
    };
  }

  componentDidMount() {
    const user_project_id = "652d0c4c5726abd7b0e8b038";
    API.getUserProject(user_project_id).then(response => {
      const project = response.data;
      this.setState({
        title: project.title,
        duration_in_minutes: project.duration_in_minutes,
        complexity: project.complexity,
        resources: project.resources,
        categories: project.categories,
        description: project.description,
        instructions: project.instructions.map(instruction => ({
          instruction_index: instruction.instruction_index,
          title: instruction.title,
          body: instruction.content,
          images: instruction.media_items
            .filter(media => media.media_type === 'image')
            .map(media => media.url)
        })),
        current: project.current_instruction_index
      }, () => {
        console.log(this.state);
      });
      
    }).catch(error => {
      console.error("Error fetching user project:", error);
    });
}


  changeCurrentInstruction = (newCurrent) => {
    this.setState(prev => ({
      ...prev,
      current: newCurrent
    }))
  }

  render() {
    return (
      <div className='float'>
      <main className='w-2/3 bg-nusb float-left'>
        <Tabs defaultValue='details' className='h-screen p-4'>
          <menu className='grid content-center h-[10%]'>
            <div className='flex place-content-between'>
              <h1 className='text-4xl text-white'>BuilderPal</h1>
              <TabsList className='w-fit object-right'>
                <TabsTrigger value="details">Project Details</TabsTrigger>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
              </TabsList>
            </div>
          </menu>
          <Separator className='my-2'/>
          <section className='h-[90%] overflow-y-auto'>
            <TabsContent value="details">
              <Details
                {...this.state}
                changeCurrentInstruction={this.changeCurrentInstruction}
              />
            </TabsContent>
            <TabsContent value="instructions">
              <Instruction
                instructions={this.state.instructions}
                current={this.state.current}
                changeCurrentInstruction={this.changeCurrentInstruction}
              />
            </TabsContent>
          </section>
        </Tabs>
      </main>
      <aside className='h-screen w-1/3 float-right'>
        <Chat/>
      </aside>
</div>
    );
  }    

}

export default Guidance;
