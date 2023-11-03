import { Recommendation } from './pages/Recommendation'
import './globals.css'
import { Guidance } from './pages/Guidance'
import React from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { userProjectLoader } from 'pages/Guidance/Guidance'
import Project, { userProjectIdLoader } from 'pages/Guidance/Project'
import RecommendationBase, { recommendationChatIdLoader } from 'pages/Recommendation/RecommendationBase'
import DynamicProject from 'pages/Guidance/DynamicProject'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<RecommendationBase />} loader={recommendationChatIdLoader}/>
      <Route path="/:id" element={<Recommendation/>}/>
      <Route path="/project/dynamic/:id" element={<DynamicProject />} />
      <Route path="/project/:id" element={<Project />} loader={userProjectIdLoader} />
      <Route path="/user_project/:id" element={<Guidance />} loader={userProjectLoader}/>
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
