<script setup>
import { useGameStore } from '@/store/gameStore';

const store = useGameStore()

const handleMaxAttemptsInput = (event) => {
	let inputValue = parseInt(event.target.value)

	if (isNaN(inputValue)) {
		store.setMaxAttempts('');
		return;
	}

	if (inputValue < 5) inputValue = 5
	if (inputValue > 10) inputValue = 10

	store.setMaxAttempts(inputValue)
	event.target.value = inputValue;
}
</script>

<template>
	<div class="settings">
		<div class="settings__container full-page-container">
			<h1 class="settings__title page-title">Settings</h1>
			<div class="settings__body">
				<div class="settings__length">
					<div class="settings__subtitle">Choose code length</div>
					<div class="settings__length-field">
						<input type="radio" id="settings-code-length-four" :checked="store.codeLength === 4"
							@change="store.setCodeLength(4)" />
						<label for="settings-code-length-four">Four</label>
					</div>
					<div class="settings__length-field">
						<input type="radio" id="settings-code-length-five" :checked="store.codeLength === 5"
							@change="store.setCodeLength(5)" />
						<label for="settings-code-length-five">Five</label>
					</div>
				</div>
				<div class="settings__attempts">
					<label for="settings-attempts-number" class="settings__subtitle">Enter number of attempts</label>
					<input type="number" min="5" max="10" placeholder="from 5 to 10" id="settings-attempts-number"
						:value="store.maxAttempts" @input="handleMaxAttemptsInput" />
				</div>
				<RouterLink :to="{ name: 'start' }" class="settings__button button">Back to start page</RouterLink>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.settings {
	&__length {
		margin-bottom: toRem(24);
	}

	&__subtitle {
		margin-bottom: toRem(12);
		font-size: toRem(18);
	}

	&__length-field {
		display: flex;
		align-items: center;

		input {
			width: auto;
			margin-right: toRem(4);
		}

		&:not(:last-child) {
			margin-bottom: toRem(8);
		}
	}

	&__attempts {
		input {
			border: 1px solid #000;
			border-radius: 16px;
			height: toRem(40);
			padding: toRem(8) toRem(16);
		}

		margin-bottom: toRem(24);
	}


	&__button {
		padding: toRem(12) toRem(16);
		border-radius: 16px;
		min-height: toRem(40);
		width: 100%;
	}

}
</style>
