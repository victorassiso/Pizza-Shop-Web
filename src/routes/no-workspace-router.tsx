import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const JoinInWorkspace = lazy(() =>
  import('@/pages/auth/join-in-workspace').then(({ JoinInWorkspace }) => ({
    default: JoinInWorkspace,
  })),
)
const CreateWorkspace = lazy(() =>
  import('@/pages/auth/create-workspace').then(({ CreateWorkspace }) => ({
    default: CreateWorkspace,
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

export const noWorkspaceRouter = createBrowserRouter([
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
            <CreateWorkspace />
          </Suspense>
        ),
      },
      {
        path: '/create-workspace',
        element: (
          <Suspense fallback={<></>}>
            <CreateWorkspace />
          </Suspense>
        ),
      },
      {
        path: '/join-in-workspace',
        element: (
          <Suspense fallback={<></>}>
            <JoinInWorkspace />
          </Suspense>
        ),
      },
    ],
  },
])
