import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore('game', () => {
	const codeLength = ref(parseInt(localStorage.getItem('game_code_length')) || 4)
	const maxAttempts = ref(parseInt(localStorage.getItem('game_max_attempts')) || 8)

	const secretCode = ref('')
	const attempts = ref([])
	const isGameOver = ref(false)
	const isWon = ref(false)

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
	function generateSecretCode(length) {
		const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
		let code = '';

		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * digits.length);
			code += digits[randomIndex];
			digits.splice(randomIndex, 1);
		}

		return code;
	}
	function checkAttempt(guess, secret) {
		let bulls = 0;
		let cows = 0;

		const guessArr = String(guess).split('');
		const secretArr = String(secret).split('');

		guessArr.forEach((digit, index) => {
			if (digit === secretArr[index]) {
				bulls++;
			} else if (secretArr.includes(digit)) {
				cows++;
			}
		});

		return { bulls, cows };
	}

	return {
		codeLength,
		maxAttempts,
		secretCode,
		attempts,
		isGameOver,
		isWon,
		setCodeLength,
		setMaxAttempts,
		startNewGame,
		addAttempt
	}
});