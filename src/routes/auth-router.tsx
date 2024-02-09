// import { AuthLayout } from '../pages/_layouts/auth'
// import { NotFound } from '../pages/404'
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const SignIn = lazy(() =>
  import('@/pages/auth/sign-in').then(({ SignIn }) => ({
    default: SignIn,
  })),
)
const SignUp = lazy(() =>
  import('@/pages/auth/sign-up').then(({ SignUp }) => ({
    default: SignUp,
  })),
)

const NotFound = lazy(() =>
  import('@/pages/404').then(({ NotFound }) => ({
    default: NotFound,
  })),
)

const AuthLayout = lazy(() =>
  import('@/pages/_layouts/auth').then(({ AuthLayout }) => ({
    default: AuthLayout,
  })),
)

export const authRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<></>}>
        <AuthLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<></>}>
        <NotFound />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<></>}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: '/sign-in',
        element: (
          <Suspense fallback={<></>}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: '/sign-up',
        element: (
          <Suspense fallback={<></>}>
            <SignUp />
          </Suspense>
        ),
      },
    ],
  },
])
