import { createRouter, createWebHistory } from 'vue-router';

import GameView from '@/views/GameView.vue';
import StartView from '@/views/StartView.vue';
import UserSettingsView from '@/views/settings/UserSettingsView.vue';
import AdminSettingsView from '@/views/settings/AdminSettingsView.vue';

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      { path: '/', name: 'start', component: StartView },
      { path: '/game', name: 'game', component: GameView },
      {
         path: '/settings',
         name: 'user-settings',
         component: UserSettingsView,
         meta: {
            layout: 'userSettings',
         },
      },
      {
         path: '/admin-settings',
         name: 'admin-settings',
         component: AdminSettingsView,
         meta: {
            layout: 'adminSettings',
         },
      },
   ],
});

export default router;
