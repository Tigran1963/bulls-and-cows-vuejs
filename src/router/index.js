import { createRouter, createWebHistory } from 'vue-router';

import UserSettingsLayout from '@/layouts/UserSettingsLayout.vue';
import AdminSettingsLayout from '@/layouts/AdminSettingsLayout.vue';

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
         component: UserSettingsLayout,
         children: [
            {
               path: '',
               name: 'user-settings',
               component: UserSettingsView,
            },
         ],
      },
		{
         path: '/admin-settings',
         component: AdminSettingsLayout,
         children: [
            {
               path: '',
               name: 'admin-settings',
               component: AdminSettingsView,
            },
         ],
      },
   ],
});

export default router;
