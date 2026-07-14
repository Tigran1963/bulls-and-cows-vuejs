import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useStorage } from '@vueuse/core';

export const useSettingsStore = defineStore('settings', () => {
   const appTheme = useStorage('app_theme', 'light');
	const digitsRepeatable = useStorage('game_digits_repeatable', false);
   const digitsColors = useStorage('game_digits_colors', {
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
      A: '#702515',
      B: '#80CF8F',
      C: '#56E8DE',
      D: '#9DADF5',
      E: '#FF5EC7',
      F: '#C4020E',
   });
   const difficulties = useStorage('game_difficulties', [
      { id: 'easy', name: 'Easy', maxAttempts: 10, codeLength: 4, range: '1-6' },
      { id: 'medium', name: 'Medium', maxAttempts: 8, codeLength: 4, range: '1-9' },
      { id: 'hard', name: 'Hard', maxAttempts: 6, codeLength: 5, range: '1-A' },
      { id: 'extreme', name: 'Extreme', maxAttempts: 4, codeLength: 5, range: '1-F' },
   ]);
	const currentDifficultyId = useStorage('game_current_difficulty', 'medium')

   const currentDifficulty = computed(() => {
      return difficulties.value.find((d) => d.id === currentDifficultyId.value) || difficulties.value[1];
   });

   const setTheme = (theme) => {
      appTheme.value = theme;
      document.documentElement.setAttribute('data-theme', theme);
   };

   const setDigitsRepeatable = (value) => {
      digitsRepeatable.value = value;
   };

   const setDifficulty = (id) => {
      currentDifficultyId.value = id;
   };

   const updateDifficultyParams = (id, params) => {
      const diff = difficulties.value.find((d) => d.id === id);
      if (diff) {
         if (params.maxAttempts) diff.maxAttempts = parseInt(params.maxAttempts);
         if (params.codeLength) diff.codeLength = parseInt(params.codeLength);
         if (params.range) diff.range = params.range;
      }
   };

   const updateDigitColor = (digit, color) => {
      digitsColors.value[digit] = color;
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
