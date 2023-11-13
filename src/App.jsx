import { Recommendation } from './pages/Recommendation'
import './globals.css'
import { Guidance } from './pages/Guidance'
import React from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { userProjectLoader } from 'pages/Guidance/Guidance'
import Project, { userProjectIdLoader } from 'pages/Guidance/Project'
import RecommendationBase, { recommendationChatIdLoader } from 'pages/Recommendation/RecommendationBase'
import DynamicProject from 'pages/Guidance/DynamicProject'
import UserProjectCompletion from 'pages/Guidance/UserProjectCompletion'
import { RecommendationChat } from 'pages/RecommendationNew'
import DynamicResults from 'pages/RecommendationNew/DynamicResults'
import StaticResults from 'pages/RecommendationNew/StaticResults'
import Landing from 'pages/Landing/Landing'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
       <Route index element={<RecommendationBase />} />
       <Route path="/landing" element={<Landing />} />
      {/* <Route index element={<RecommendationBase />} loader={recommendationChatIdLoader}/> */}
      <Route path="/:id" element={<RecommendationChat/>}/>
      <Route path="/:chat_id/dynamic/:section_id" element={<DynamicResults />} />
      <Route path="/:chat_id/static/:section_id" element={<StaticResults />} />
      <Route path="/project/dynamic/:id" element={<DynamicProject />} />
      <Route path="/project/:id" element={<Project />} loader={userProjectIdLoader} />
      <Route path="/user_project/:id" element={<Guidance />} loader={userProjectLoader}/>
      <Route path="/user_project/:id/completion" element={<UserProjectCompletion />} />
    </Route>
  )
)

const App = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
