import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '../pages/_layouts/app'
import { NotFound } from '../pages/404'
import { Customers } from '../pages/app/customers/customers'
import { Dashboard } from '../pages/app/dashboard/dashboard'
import { Orders } from '../pages/app/orders/orders'
import { Products } from '../pages/app/products/products'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/orders', element: <Orders /> },
      { path: '/products', element: <Products /> },
      { path: '/customers', element: <Customers /> },
    ],
  },
])
