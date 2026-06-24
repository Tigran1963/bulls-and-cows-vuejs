<script setup>
import { ref, onMounted, watch } from 'vue';
import { useGameStore } from '@/store/gameStore';

const store = useGameStore()
const currentGuess = ref('')

const handleTry = () => {
	if (!currentGuess.value) return

	if (currentGuess.value.length !== store.codeLength) {
		alert(`Код должен состоять ровно из ${store.codeLength} цифр`)
		return
	} 
	
	const uniqueDigits = new Set(currentGuess.value.split(''))
	if (uniqueDigits.size !== currentGuess.value.length) {
		alert('Цифры в коде не должны повторяться')
		return
	}

	store.addAttempt(currentGuess.value)
	currentGuess.value = ''
}
const handleNewGame = () => {
	store.startNewGame()
	currentGuess.value = ''
}

watch(() => store.isGameOver, (isOver) => {
	if (isOver) {
		setTimeout(() => {
			if (store.isWon) {
				alert('Поздравляем! Вы выиграли!');
			} else {
				alert(`Вы проиграли. Загаданный код был: ${store.secretCode}`);
			}
			handleNewGame();
		}, 100);
	}
})
onMounted(() => {
	handleNewGame();
})
</script>

<template>
	<div class="game">
		<div class="game__container full-page-container">
			<div class="game__top">
				<RouterLink :to="{ name: 'start' }" class="game__top-button button">Start page</RouterLink>
				<div class="game__timer">00:00</div>
				<button @click="handleNewGame" class="game__top-button button">New game</button>
			</div>
			<div class="game__body">
				<div v-for="n in store.maxAttempts" :key="n" class="game__field field-game"
					:class="{ '_disabled': n !== store.attempts.length + 1 || store.isGameOver }">
					<div class="field-game__attempt-num">{{ n + ")" }}</div>
					<div class="field-game__input">
						<input v-if="n === store.attempts.length + 1 && !store.isGameOver" type="text" v-model="currentGuess"
							placeholder="Guess the code" @keydown.enter="handleTry">
						<input v-else type="text" :value="store.attempts[n - 1]?.guess || ''" disabled
							@keydown.enter="handleTry">
						<button class="button" type='button' :disabled="n !== store.attempts.length + 1 || store.isGameOver"
							@click="handleTry">
							Try
						</button>
					</div>
					<div class=" field-game__texts">
						<div class="field-game__text">Bulls: {{ store.attempts[n - 1] ? store.attempts[n - 1].bulls : 0 }}
						</div>
						<div class="field-game__text">Cows: {{ store.attempts[n - 1] ? store.attempts[n - 1].cows : 0 }}</div>
					</div>
				</div>
			</div>
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
		margin-bottom: toRem(32);
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
		width: 100%;
	}

	&__field {
		display: flex;
		align-items: center;
		justify-content: space-between;

		&:not(:last-child) {
			margin-bottom: toRem(16);
		}
	}
}

.field-game {
	&__attempt-num {
		font-size: toRem(20);
		flex: 0 0 toRem(18);
		margin-right: toRem(8);
	}

	&__input {
		margin-right: toRem(16);
		display: flex;

		input {
			border: 1px solid #000;
			height: toRem(40);
			border-radius: 16px 0px 0px 16px;
			padding: toRem(8) toRem(16);
			font-size: toRem(22);
			border-right: none;
			background-color: #fff;

			&::placeholder {
				font-size: toRem(16);
			}

			&:disabled {
				opacity: 0.5;
			}
		}

		button {
			padding: toRem(12) toRem(16);
			border-radius: 0px 16px 16px 0px;

			&:disabled {
				opacity: 0.5;
				cursor: default;

				@media (any-hover: hover) {
					&:hover {
						opacity: 0.5;
						background-color: $orangeColor;
					}
				}
			}
		}
	}

	&__texts {
		display: flex;
		flex-direction: column;
		align-items: end;
		gap: toRem(8);
	}

	&__text {
		white-space: nowrap;
	}
}
</style>
