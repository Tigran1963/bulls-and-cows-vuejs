import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { checkAttempt, generateSecretCode } from '@/core/functions';
import { useSettingsStore } from '@/stores/settingsStore';

export const useGameStore = defineStore('game', () => {
   const settingsStore = useSettingsStore();

   const codeLength = computed(() => settingsStore.currentDifficulty.codeLength);
   const maxAttempts = computed(() => settingsStore.currentDifficulty.maxAttempts);
   const digitsRepeatable = computed(() => settingsStore.digitsRepeatable);
   const range = computed(() => settingsStore.currentDifficulty.range);

   const secretCode = ref('');
   const attempts = ref([]);
   const isGameOver = ref(false);
   const isWon = ref(false);

   const startNewGame = () => {
      secretCode.value = generateSecretCode(codeLength.value, range.value, digitsRepeatable.value);
      attempts.value = [];
      isGameOver.value = false;
      isWon.value = false;
   };

   const addAttempt = (guess) => {
      if (isGameOver.value) return;

      const { bulls, cows } = checkAttempt(guess, secretCode.value);

      attempts.value.push({
         guess: guess,
         bulls: bulls,
         cows: cows,
      });

      if (bulls === codeLength.value) {
         isWon.value = true;
         isGameOver.value = true;
         return;
      }

      if (attempts.value.length >= maxAttempts.value) {
         isGameOver.value = true;
      }
   };

   return {
      secretCode,
      attempts,
      isGameOver,
      isWon,
      startNewGame,
      addAttempt,
   };
});
