import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { Loading } from '@/pages/loading'

// import { Orders } from '@/pages/app/orders/orders'
// import { Customers } from '@/pages/app/customers/customers'
// import { Products } from '@/pages/app/products/products'
// import { AppLayout } from '../pages/_layouts/app'
// import { NotFound } from '../pages/404'

const NotFound = lazy(() =>
  import('@/pages/404').then(({ NotFound }) => ({
    default: NotFound,
  })),
)

const Dashboard = lazy(() =>
  import('@/pages/app/dashboard/dashboard').then(({ Dashboard }) => ({
    default: Dashboard,
  })),
)

const Customers = lazy(() =>
  import('@/pages/app/customers/customers').then(({ Customers }) => ({
    default: Customers,
  })),
)

const Products = lazy(() =>
  import('@/pages/app/products/products').then(({ Products }) => ({
    default: Products,
  })),
)

const Orders = lazy(() =>
  import('@/pages/app/orders/orders').then(({ Orders }) => ({
    default: Orders,
  })),
)

const AppLayout = lazy(() =>
  import('@/pages/_layouts/app').then(({ AppLayout }) => ({
    default: AppLayout,
  })),
)

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <AppLayout />
      </Suspense>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: '/orders',
        element: (
          <Suspense fallback={<Loading />}>
            <Orders />
          </Suspense>
        ),
      },
      {
        path: '/products',
        element: (
          <Suspense fallback={<></>}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: '/customers',
        element: (
          <Suspense fallback={<></>}>
            <Customers />
          </Suspense>
        ),
      },
    ],
  },
])
