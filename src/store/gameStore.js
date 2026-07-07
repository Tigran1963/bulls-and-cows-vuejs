import { defineStore } from "pinia";
import { ref } from "vue";
import { checkAttempt, generateSecretCode } from "@/core/functions";

export const useGameStore = defineStore('game', () => {
	const codeLength = ref(parseInt(localStorage.getItem('game_code_length')) || 4)
	const maxAttempts = ref(parseInt(localStorage.getItem('game_max_attempts')) || 8)

	const secretCode = ref('')
	const attempts = ref([])
	const isGameOver = ref(false)
	const isWon = ref(false)
	const digitsColors = ref({
		'1': '#FF6B6B',
		'2': '#FF9F1C',
		'3': '#FFD93D',
		'4': '#6BCB77',
		'5': '#00F5D4',
		'6': '#64a3fc',
		'7': '#0f6fb3',
		'8': '#9B5DE5',
		'9': '#A06A42',
		'0': '#000'
	})

	const startNewGame = () => {
		secretCode.value = generateSecretCode(codeLength.value)
		attempts.value = []
		isGameOver.value = false
		isWon.value = false
	}
	const setCodeLength = (length) => {
		if (length === 4 || length === 5) {
			codeLength.value = length;
			localStorage.setItem('game_code_length', length);
		}
	}
	const setMaxAttempts = (attempts) => {
		const parsed = parseInt(attempts);
		if (!isNaN(parsed) && parsed >= 5 && parsed <= 10) {
			maxAttempts.value = parsed;
			localStorage.setItem('game_max_attempts', parsed);
		}
	}
	const addAttempt = (guess) => {
		if (isGameOver.value) return;

		const { bulls, cows } = checkAttempt(guess, secretCode.value)

		attempts.value.push({
			guess: guess,
			bulls: bulls,
			cows: cows
		})

		if (bulls === codeLength.value) {
			isWon.value = true
			isGameOver.value = true
			return;
		}

		if (attempts.value.length >= maxAttempts.value) {
			isGameOver.value = true
		}
	}

	return {
		codeLength,
		maxAttempts,
		secretCode,
		attempts,
		isGameOver,
		isWon,
		digitsColors,
		setCodeLength,
		setMaxAttempts,
		startNewGame,
		addAttempt
	}
});