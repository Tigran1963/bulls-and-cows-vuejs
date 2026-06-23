import { createRouter, createWebHistory } from "vue-router";

import App from "@/App.vue";
import SettingsView from "@/views/SettingsView.vue";
import GameView from "@/views/GameView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: '/', name: "home", component: App },
		{ path: '/settings', name: "about", component: SettingsView },
		{ path: '/game', name: "game", component: GameView}
	]
})

export default router