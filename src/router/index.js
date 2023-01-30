import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import PostView from '@/views/PostView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/ZnBbkw',
    name: 'admin',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/AdminView.vue'),
  },
  {
    path: '/post/:id',
    component: PostView,
  },
  {
    path: '/posts',
    component: () =>
      import(/* webpackChunkName: "posts" */ '@/views/PostsView.vue'),
  },
  {
    path: '/category/:id',
    component: () =>
      import(/* webpackChunkName: "category" */ '@/views/CategoryView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
