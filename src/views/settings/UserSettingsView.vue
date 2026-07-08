<script setup>
import { useSettingsStore } from '@/stores/settingsStore';

const settingsStore = useSettingsStore();
</script>

<template>
   <div class="settings__section">
      <h2 class="settings__section-title">App Theme</h2>
      <div class="settings__row">
         <button
            @click="settingsStore.setTheme('light')"
            class="button settings__toggle-btn"
            :class="{ 'settings__toggle-btn--active': settingsStore.appTheme === 'light' }"
         >
            Light
         </button>
         <button
            @click="settingsStore.setTheme('dark')"
            class="button settings__toggle-btn"
            :class="{ 'settings__toggle-btn--active': settingsStore.appTheme === 'dark' }"
         >
            Dark
         </button>
      </div>
   </div>

   <div class="settings__section">
      <label class="settings__checkbox-label">
         <input
            type="checkbox"
            :checked="settingsStore.digitsRepeatable"
            @change="settingsStore.setDigitsRepeatable(!settingsStore.digitsRepeatable)"
         />
         <span>Allow duplicate digits in secret code</span>
      </label>
   </div>

   <div class="settings__section">
      <h2 class="settings__section-title">Select Difficulty</h2>
      <div class="settings__options">
         <label
            v-for="diff in settingsStore.difficulties"
            :key="diff.id"
            class="settings__radio-label"
            :class="{ 'settings__radio-label--active': settingsStore.currentDifficultyId === diff.id }"
         >
            <input
               type="radio"
               name="difficulty"
               :value="diff.id"
               :checked="settingsStore.currentDifficultyId === diff.id"
               @change="settingsStore.setDifficulty(diff.id)"
            />
            <div class="settings__radio-info">
               <span class="settings__diff-name">{{ diff.name }}</span>
               <span class="settings__diff-desc">Length: {{ diff.codeLength }} | Attempts: {{ diff.maxAttempts }}</span>
            </div>
         </label>
      </div>
   </div>

   <div class="settings__section">
      <h2 class="settings__section-title">Choose digits colors</h2>
      <div class="settings__colors-grid">
         <div v-for="(color, digit) in settingsStore.digitsColors" :key="digit" class="settings__color-item">
            <span class="settings__color-digit">{{ digit }}</span>
            <input
               type="color"
               :value="color"
               @input="settingsStore.updateDigitColor(digit, $event.target.value)"
               class="settings__color-picker"
            />
         </div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.settings {
   &__section {
      width: 100%;
      background: #fcfcfc;
      border: 1px solid #eee;
      border-radius: 16px;
      padding: toRem(16);
      &:not(:last-child) {
         margin-bottom: toRem(16);
      }
   }

   &__section-title {
      font-size: toRem(18);
      font-weight: 600;
      margin-bottom: toRem(16);
   }
   &__row {
      display: flex;
      gap: toRem(12);
   }

   &__toggle-btn {
      flex: 1;
      padding: toRem(12);
      background-color: #eee;
      color: #000;
      border-radius: 16px;
      &--active {
         background-color: $orangeColor;
         color: #fff;
      }
   }

   &__checkbox-label {
      display: flex;
      align-items: center;
      gap: toRem(12);
      font-size: toRem(16);
      cursor: pointer;

      input {
         width: toRem(15);
         height: toRem(15);
         accent-color: $orangeColor;
      }
   }

   &__options {
      display: flex;
      flex-direction: column;
      gap: toRem(10);
   }

   &__radio-label {
      display: flex;
      align-items: center;
      gap: toRem(12);
      padding: toRem(12);
      border: 2px solid #ccc;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease;

      input {
         accent-color: $orangeColor;
         width: toRem(30);
      }

      &--active {
         border-color: $orangeColor;
         background-color: rgba($orangeColor, 0.1);
      }
   }

   &__radio-info {
      display: flex;
      flex-direction: column;
   }

   &__diff-name {
      font-weight: 600;
      font-size: toRem(16);
   }

   &__diff-desc {
      font-size: toRem(13);
      color: #666;
   }

   &__colors-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: toRem(12);

      @media (max-width: $mobileSmall) {
         grid-template-columns: repeat(3, 1fr);
      }
   }

   &__color-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: toRem(4);
      background: #f0f0f0;
      padding: toRem(8);
      border-radius: 8px;
   }

   &__color-digit {
      font-weight: 700;
      font-size: toRem(16);
   }

   &__color-picker {
      border: none;
      width: toRem(36);
      height: toRem(36);
      border-radius: 50%;
      cursor: pointer;
      background: none;

      &::-webkit-color-swatch-wrapper {
         padding: 0;
      }
      &::-webkit-color-swatch {
         border: none;
         border-radius: 50%;
      }
   }
}
</style>
