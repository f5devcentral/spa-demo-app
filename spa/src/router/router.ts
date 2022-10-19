import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import CartPage from "../views/CartPage.vue"
import ProductDetailPage from "../views/ProductDetailPage.vue"
import ProductsPage from "../views/ProductsPage.vue"
import NotFoundPage from "../views/NotFoundPage.vue"
import ProfilePage from "../views/ProfilePage.vue"
import FailedPage from "../views/FailedPage.vue"
import CheckoutPage from "../views/CheckoutPage.vue"
import ConfigPage from "../views/ConfigPage.vue"
import { registerGuard } from "./Guard"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/products",
  },
  {
    path: "/products",
    name: "Products",
    component: ProductsPage,
  },
  {
    path: "/products/:id",
    name: "ProductDetail",
    component: ProductDetailPage,
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartPage,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFoundPage,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: CheckoutPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/failed",
    name: "Failed",
    component: FailedPage,
  },
  {
    path: "/config",
    name: "Config",
    component: ConfigPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

registerGuard(router)

export default router
