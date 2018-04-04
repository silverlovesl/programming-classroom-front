import { CookieService } from '../services/cookie.service'

export default [
  {
    path: '/signin',
    component: () => import('pages/signin'),
    meta: { requiresAuth: false }
  },
  {
    path: '/change-password',
    component: () => import('pages/change-password'),
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    component: () => import('layouts/default'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/index') },
      { path: '/homework', component: () => import('pages/homework') },
      { path: '/account', component: () => import('pages/account') }
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () =>
      import('pages/404')
  }
]
