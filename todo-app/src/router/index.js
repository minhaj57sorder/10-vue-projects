import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list-todo',
      component: () => import('../views/listTodoView.vue')
    },
  ],
});
export default router;
