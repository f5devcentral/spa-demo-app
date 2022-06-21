import { createRouter, createWebHistory } from 'vue-router'
import CartPage from '../views/CartPage.vue';
import ProductDetailPage from '../views/ProductDetailPage.vue';
import ProductsPage from '../views/ProductsPage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';
import StatsPage from '../views/StatsPage.vue';

const routes = [
  {
    path: '/products',
    name: 'Products',
    component: ProductsPage,
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetailPage,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage,
  },
  {
    path: '/',
    redirect: '/products',
  }, 
  {
    path: '/stats',
    name: 'Stats',
    component: StatsPage,
  },
  {
    path: '/:catchAll(.*)',
    component: NotFoundPage,
  }
]

const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes,
})

export default router
