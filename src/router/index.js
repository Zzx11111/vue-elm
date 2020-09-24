import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component:() => import('@/page/home/home'),
    },
    {
      path:'/selectAddress/:id',
      component:() => import('@/page/selectAddress/selectAddress')
    },
    {
      path:'/msite',
      component:() => import('@/page/msite/msite')
    },
    {
      path:'/login',
      component: () => import('@/page/login/login')
    },
    {
      path:'/search',
      component:() => import('@/page/search/search')
    },
    {
      path:'/profile',
      component:() => import('@/page/profile/profile')
    },
    {
      path:'/order',
      component:() => import('@/page/order/order')
    },
    {
      path:'/food',
      component:() => import('@/page/food/food')
    },
    {
      path:'/shopInfo',
      component:() => import('@/page/shopInfo/shopInfo')
    },
    {
      path:'/foodRating',
      component:() => import('@/components/foodRating')
    },
    {
      path:'/shopDetail/:id',
      component:() => import('@/page/shopInfo/chlid/shopDetail')
    },
    {
      path:'/resetPassword',
      component:() => import('@/page/login/chlid/resetPassword')
    },
    {
      path:'/confirmOrder',
      component:() => import('@/page/confirmOrder/confirmOrder')
    },
    {
      path:'/remarks',
      component:() => import('@/page/confirmOrder/child/remarks')
    },
    {
      path:'/shippingAddress',
      component:() => import('@/page/confirmOrder/child/shippingAddress')
    },
    {
      path:'/addAddress',
      component:() => import('@/page/confirmOrder/child/addAddress')
    },
    {
      path:'/searchAddress',
      component:() => import('@/page/confirmOrder/child/searchAddress')
    }
  ]
})
