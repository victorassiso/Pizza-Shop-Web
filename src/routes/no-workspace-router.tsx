// import { AuthLayout } from '../pages/_layouts/auth'
// import { NotFound } from '../pages/404'
// import { CreateWorkspace } from '../pages/auth/create-workspace'
// import { JoinInWorkspace } from '../pages/auth/join-in-workspace'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const JoinInWorkspace = lazy(() =>
  import('@/pages/auth/join-in-workspace').then(({ JoinInWorkspace }) => ({
    default: JoinInWorkspace,
  })),
)

const NotFound = lazy(() =>
  import('@/pages/404').then(({ NotFound }) => ({
    default: NotFound,
  })),
)

const CreateWorkspace = lazy(() =>
  import('@/pages/auth/create-workspace').then(({ CreateWorkspace }) => ({
    default: CreateWorkspace,
  })),
)

const AuthLayout = lazy(() =>
  import('@/pages/_layouts/auth').then(({ AuthLayout }) => ({
    default: AuthLayout,
  })),
)

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
