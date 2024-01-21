import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { NotFound } from './pages/404'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { Orders } from './pages/app/orders/orders'
import { CreateWorkspace } from './pages/auth/create-workspace'
import { JoinInWorkspace } from './pages/auth/join-in-workspace'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <NotFound />,
      children: [
        { path: '/', element: <Dashboard /> },
        { path: '/orders', element: <Orders /> },
      ],
    },

    {
      path: '/',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: '/sign-in', element: <SignIn /> },
        { path: '/sign-up', element: <SignUp /> },
        { path: '/create-workspace', element: <CreateWorkspace /> },
        { path: '/join-in-workspace', element: <JoinInWorkspace /> },
      ],
    },
  ],
  { basename: '/pizza-shop' },
)
