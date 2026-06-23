<script setup>
import { useGameStore } from '@/store/gameStore';
</script>

<template>
	<div class="start-screen">
		<div class="start-screen__container full-page-container">
			<h1 class="start-screen__title page-title">Bulls & Cows</h1>
			<div class="start-screen__subtitle">Break the code!</div>
			<RouterLink :to="{ name: 'game' }" class="start-screen__button button">Play</RouterLink>
			<RouterLink :to="{ name: 'settings' }" class="start-screen__button button">Settings</RouterLink>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.start-screen {
	&__subtitle {
		font-size: toRem(24);
		margin-bottom: toRem(48);
	}

	&__button {
		padding: toRem(20);
		font-size: toRem(24);
		border-radius: 24px;
		width: toRem(240);

		&:not(:last-child) {
			margin-bottom: toRem(16);
		}
	}
}
</style>
