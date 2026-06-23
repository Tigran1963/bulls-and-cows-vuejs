<script setup>
import { useGameStore } from '@/store/gameStore';

const store = useGameStore()
</script>

<template>
	<div class="game">
		<div class="game__container full-page-container">
			<div class="game__top">
				<RouterLink :to="{ name: 'start' }" class="game__top-button button">Start page</RouterLink>
				<div class="game__timer">00:00</div>
				<button @click="store.startNewGame" class="game__top-button button">New game</button>
			</div>
			<div class="game__body"></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.game {
	&__top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: toRem(16);
		width: 100%;
		margin-bottom: toRem(16);
	}

	&__top-button {
		padding: toRem(12) toRem(16);
		border-radius: 16px;

		@media (max-width:$mobileSmall) {
			font-size: toRem(14);
			padding: toRem(12);
		}
	}

	&__timer {
		font-size: toRem(18);
		font-weight: 600;
	}

	&__body {
		height: toRem(600);
		width: 100%;
		background-color: $mainColor;
	}
}
</style>
