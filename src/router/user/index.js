export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    name: '/home',
    path: '/home',
    component: () => import('../../views/home/index')
  }
]