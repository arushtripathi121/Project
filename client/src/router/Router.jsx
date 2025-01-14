import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'

const Router = () => {
    

    const appRouter = createBrowserRouter([
        {
            path:'/',
            element:<Home/>
        }
    ])
  return (
    <RouterProvider router={appRouter}>

    </RouterProvider>
  )
}

export default Router