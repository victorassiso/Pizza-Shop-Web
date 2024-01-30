import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout } from '../pages/_layouts/auth'
import { NotFound } from '../pages/404'
import { CreateWorkspace } from '../pages/auth/create-workspace'
import { JoinInWorkspace } from '../pages/auth/join-in-workspace'

export const noWorkspaceRouter = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <JoinInWorkspace /> },
      { path: '/create-workspace', element: <CreateWorkspace /> },
      { path: '/join-in-workspace', element: <JoinInWorkspace /> },
    ],
  },
])
