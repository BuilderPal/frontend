import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import { Separator } from 'components/ui/separator';
import Details from './Details';
import Instruction from './Instruction';
import Chat from '../../components/chat/Chat';
import { API } from '../../lib/utils';
import ClipLoader from "react-spinners/ClipLoader";

import React, { useState, useEffect } from 'react';

const templateUserProject = {
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
}

function Guidance({ userProjectId }) {
  const [userProject, setUserProject] = useState(templateUserProject)
  const [instructionIndex, setInstructionIndex] = useState(0)
  const [isLoadingProject, setIsLoadingProject] = useState(false)
  useEffect(() => {
    API.getUserProject(userProjectId).then(response => {
      const project = response.data;
      setUserProject(prevState => ({
        ...prevState,
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
      }), (_) => {
        setIsLoadingProject(false)
      });
    }).catch(error => {
      console.error("Error fetching user project:", error);
    });
  }, []);

  const changeCurrentInstruction = (newCurrent) => {
    setUserProject(prevState => ({
      ...prevState,
      current: newCurrent
    }));
  };

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
          <Separator className='my-2' />
          <section className='h-[90%] overflow-y-auto'>
            {
              isLoadingProject ? <ClipLoader
                loading={isLoadingProject}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              /> : (
                <>
                  <TabsContent value="details">
                    <Details
                      {...userProject}
                      instructionIndex={instructionIndex}
                      setInstructionIndex={setInstructionIndex}
                    />
                  </TabsContent>
                  <TabsContent value="instructions">
                    <Instruction
                      instructions={userProject.instructions}
                      instructionIndex={instructionIndex}
                      setInstructionIndex={setInstructionIndex}
                    />
                  </TabsContent>
                </>
              )
            }
          </section>
        </Tabs>
      </main>
      <aside className='h-screen w-1/3 float-left'>
        <Chat />
      </aside>
    </div>
  );
}

export default Guidance;
