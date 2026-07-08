import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
   const appTheme = ref(localStorage.getItem('app_theme') || 'light');
   const digitsRepeatable = ref(localStorage.getItem('game_digits_repeatable') === 'true');
   const digitsColors = ref(
      JSON.parse(localStorage.getItem('game_digits_colors')) || {
         1: '#FF6B6B',
         2: '#FF9F1C',
         3: '#FFD93D',
         4: '#6BCB77',
         5: '#00F5D4',
         6: '#64a3fc',
         7: '#0f6fb3',
         8: '#9B5DE5',
         9: '#A06A42',
         0: '#000000',
      },
   );
   const difficulties = ref(
      JSON.parse(localStorage.getItem('game_difficulties')) || [
         { id: 'easy', name: 'Easy', maxAttempts: 10, codeLength: 4 },
         { id: 'medium', name: 'Medium', maxAttempts: 8, codeLength: 4 },
         { id: 'hard', name: 'Hard', maxAttempts: 6, codeLength: 5 },
         { id: 'extreme', name: 'Extreme', maxAttempts: 4, codeLength: 5 },
      ],
   );
   const currentDifficultyId = ref(localStorage.getItem('game_current_difficulty') || 'medium');

   const currentDifficulty = computed(() => {
      return difficulties.value.find((d) => d.id === currentDifficultyId.value) || difficulties.value[1];
   });

   const setTheme = (theme) => {
      appTheme.value = theme;
      localStorage.setItem('app_theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
   };

   const setDigitsRepeatable = (value) => {
      digitsRepeatable.value = value;
      localStorage.setItem('game_digits_repeatable', value);
   };

   const setDifficulty = (id) => {
      currentDifficultyId.value = id;
      localStorage.setItem('game_current_difficulty', id);
   };

   const updateDifficultyParams = (id, params) => {
      const diff = difficulties.value.find((d) => d.id === id);
      if (diff) {
         if (params.maxAttempts) diff.maxAttempts = parseInt(params.maxAttempts);
         if (params.codeLength) diff.codeLength = parseInt(params.codeLength);
         if (params.base) diff.base = parseInt(params.base);
         localStorage.setItem('game_difficulties', JSON.stringify(difficulties.value));
      }
   };

   const updateDigitColor = (digit, color) => {
      digitsColors.value[digit] = color;
      localStorage.setItem('game_digits_colors', JSON.stringify(digitsColors.value));
   };

   return {
      appTheme,
      digitsRepeatable,
      digitsColors,
      difficulties,
      currentDifficultyId,
      currentDifficulty,
      setTheme,
      setDigitsRepeatable,
      setDifficulty,
      updateDifficultyParams,
      updateDigitColor,
   };
});
