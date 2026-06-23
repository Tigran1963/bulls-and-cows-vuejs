import { createRouter, createWebHistory } from "vue-router";

import SettingsView from "@/views/SettingsView.vue";
import GameView from "@/views/GameView.vue";
import StartView from "@/views/StartView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: '/', name: "start", component: StartView },
		{ path: '/settings', name: "settings", component: SettingsView },
		{ path: '/game', name: "game", component: GameView}
	]
})

export default router