import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/views/Index'
import Catalog from '@/views/Catalog'
import ProductPage from '@/views/ProductPage'
import PersonalArea from '@/views/PersonalArea'
import Cart from '@/views/Cart.vue'
import Login from "@/views/Login";
import Register from "@/views/Register";
import Admin from "@/views/Admin";

Vue.use(Router);

export const router = new Router({
    mode: 'history',
  routes: [
      {
          path: '/',
          name: 'main-page',
          component: Index
      },
      {
          path: '/catalog',
          name: 'catalog-page',
          component: Catalog
      },
      {
          path: '/productpage/:id',
          name: 'product-page',
          component: ProductPage
      },
      {
          path: '/personalarea',
          name: 'personal-area',
          component: PersonalArea
      },
      {
          path: '/cart',
          name: 'cart',
          component: Cart
      },
      {
          path: '/login',
          component: Login
      },
      {
          path: '/register',
          component: Register
      },
      {
          path: '/admin',
          component: Admin
      }
  ]  
})
