import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout } from '../pages/_layouts/auth'
import { NotFound } from '../pages/404'
import { SignIn } from '../pages/auth/sign-in'
import { SignUp } from '../pages/auth/sign-up'

export const authRouter = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <SignIn /> },
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
])
