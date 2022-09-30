import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import CartPage from '../views/CartPage.vue';
import ProductDetailPage from '../views/ProductDetailPage.vue';
import ProductsPage from '../views/ProductsPage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import ProfileNoGuardPage from '../views/ProfileNoGuardPage.vue';
import FailedPage from "../views/FailedPage.vue";
import CheckoutPage from '../views/CheckoutPage.vue';
import { registerGuard } from "./Guard";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/products',
  },
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
    path: '/:catchAll(.*)',
    component: NotFoundPage,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profileNoGuard',
    name: 'ProfileNoGuard',
    component: ProfileNoGuardPage
  },
  {
    path: '/failed',
    name: 'Failed',
    component: FailedPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

registerGuard(router);

export default router;
