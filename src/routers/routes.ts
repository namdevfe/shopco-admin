import { lazy } from 'react'

const routes = [
  {
    path: '/',
    component: lazy(() => import('../pages/HomePage'))
  },
  {
    path: '/blogs',
    component: lazy(() => import('../pages/BlogPage'))
  }
]

export default routes
