<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useGameStore } from '@/stores/gameStore';
import { useSettingsStore } from '@/stores/settingsStore';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const gameStore = useGameStore();
const settingsStore = useSettingsStore();
const currentGuess = ref(Array(settingsStore.currentDifficulty.codeLength).fill(''));
const cellRefs = ref([]);
const activeIndex = ref(null);

const focusInput = () => {
   nextTick(() => {
      if (gameStore.isGameOver) return;

      const nextIndex = currentGuess.value.findIndex((val) => val === '');
      const targetIndex = nextIndex !== -1 ? nextIndex : settingsStore.currentDifficulty.codeLength - 1;

      cellRefs.value[targetIndex]?.focus();
   });
};

const handleCellInput = (event, index) => {
   const val = event.target.value.replace(/[^0-9]/g, '');

   if (val) {
      currentGuess.value[index] = val[0];
      if (index < settingsStore.currentDifficulty.codeLength - 1) {
         cellRefs.value[index + 1]?.focus();
      }
   } else {
      currentGuess.value[index] = '';
   }
};

const handleCellKeyDown = (event, index) => {
   if (event.key === 'Backspace') {
      if (!currentGuess.value[index] && index > 0) {
         event.preventDefault();
         currentGuess.value[index - 1] = '';
         cellRefs.value[index - 1]?.focus();
      }
   } else if (event.key === 'Enter') {
      handleTry();
   }
};

const handleTry = () => {
   if (currentGuess.value.includes('')) {
      alert(`The code must consist of exactly ${settingsStore.currentDifficulty.codeLength} digits`);
      return;
   }
	
   if (!settingsStore.digitsRepeatable) {
      const uniqueDigits = new Set(currentGuess.value);
      if (uniqueDigits.size !== settingsStore.currentDifficulty.codeLength) {
         alert('The digits in the code must not repeat');
         return;
      }
   }

   gameStore.addAttempt(currentGuess.value.join(''));
   currentGuess.value = Array(settingsStore.currentDifficulty.codeLength).fill('');
   focusInput();
};

const handleNewGame = () => {
   gameStore.startNewGame();
   currentGuess.value = Array(settingsStore.currentDifficulty.codeLength).fill('');
   cellRefs.value = [];
   focusInput();
};

watch(
   () => gameStore.isGameOver,
   (isOver) => {
      if (isOver) {
         setTimeout(() => {
            if (gameStore.isWon) {
               alert('Congratulations! You won!');
            } else {
               alert(`You lost. The secret code was: ${gameStore.secretCode}`);
            }
            handleNewGame();
         }, 100);
      }
   },
);
onMounted(() => {
   handleNewGame();
});
</script>

<template>
   <div class="game full-page-container">
      <Header>
         <div class="game__top">
            <RouterLink :to="{ name: 'start' }" class="game__top-button button">Start page</RouterLink>
            <div class="game__timer">00:00</div>
            <button @click="handleNewGame" class="game__top-button button">New game</button>
         </div>
      </Header>
      <div class="game__container">
         <div v-for="n in settingsStore.currentDifficulty.maxAttempts" :key="n" class="game__field field-game">
            <div class="field-game__attempt-num">{{ n + ')' }}</div>
            <div class="field-game__attempt">
               <div class="field-game__attempt-show" v-if="gameStore.attempts[n - 1]">
                  <span
                     v-for="y in settingsStore.currentDifficulty.codeLength"
                     :key="y"
                     :style="{ backgroundColor: settingsStore.digitsColors[gameStore.attempts[n - 1].guess[y - 1]] }"
                  >
                     {{ gameStore.attempts[n - 1].guess[y - 1] }}
                  </span>
               </div>
               <div
                  class="field-game__attempt-show field-game__attempt-show--active"
                  v-else-if="n === gameStore.attempts.length + 1 && !gameStore.isGameOver"
                  @click="focusInput"
               >
                  <span
                     v-for="y in settingsStore.currentDifficulty.codeLength"
                     :key="y"
                     :style="
                        currentGuess[y - 1]
                           ? {
                                backgroundColor: settingsStore.digitsColors[currentGuess[y - 1]],
                                color: '#fff',
                                borderColor: settingsStore.digitsColors[currentGuess[y - 1]],
                             }
                           : {}
                     "
                  >
                     {{ currentGuess[y - 1] }}
                  </span>
               </div>
               <div class="field-game__attempt-show field-game__attempt-show--disabled" v-else>
                  <span v-for="y in settingsStore.currentDifficulty.codeLength" :key="y"></span>
               </div>
            </div>
            <div class="field-game__texts">
               <div class="field-game__text">
                  Bulls: {{ gameStore.attempts[n - 1] ? gameStore.attempts[n - 1].bulls : 0 }}
               </div>
               <div class="field-game__text">
                  Cows: {{ gameStore.attempts[n - 1] ? gameStore.attempts[n - 1].cows : 0 }}
               </div>
            </div>
         </div>
      </div>
      <Footer>
         <div class="code-input">
            <div class="code-input__cells">
               <input
                  v-for="y in settingsStore.currentDifficulty.codeLength"
                  :key="y"
                  :ref="(el) => (cellRefs[y - 1] = el)"
                  type="text"
                  autocomplete="off"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  maxlength="1"
                  class="code-input__cell-input"
                  :class="{ 'code-input__cell-input--active': activeIndex === y - 1 }"
                  :value="currentGuess[y - 1]"
                  :style="currentGuess[y - 1] ? { borderColor: settingsStore.digitsColors[currentGuess[y - 1]] } : {}"
                  :disabled="gameStore.isGameOver"
                  @input="handleCellInput($event, y - 1)"
                  @keydown="handleCellKeyDown($event, y - 1)"
                  @focus="activeIndex = y - 1"
                  @blur="activeIndex === y - 1 && (activeIndex = null)"
               />
            </div>
            <button class="button" type="button" @click="handleTry" :disabled="gameStore.isGameOver">Try</button>
         </div>
      </Footer>
   </div>
</template>

<style lang="scss" scoped>
.game {
   padding-top: toRem(104);
   padding-bottom: toRem(128);

   &__container {
      width: 100%;
   }

   &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: toRem(16);
   }

   &__top-button {
      padding: toRem(12) toRem(16);
      border-radius: 16px;

      @media (max-width: $mobileSmall) {
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

.code-input {
   display: flex;
   align-items: center;
   gap: toRem(16);
   justify-content: space-between;

   button {
      padding: toRem(12) toRem(16);
      border-radius: 16px;
      width: toRem(70);
      height: toRem(50);
      flex: 0 0 toRem(70);
      @media (max-width: toEm(390)) {
         height: toRem(40);
         width: toRem(60);
         flex: 0 0 toRem(60);
      }
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

   &__cells {
      display: flex;
      gap: toRem(8);
   }

   &__cell-input {
      position: relative;
      width: toRem(50);
      height: toRem(50);
      border-radius: 50%;
      border: 2px solid #ccc;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      font-size: toRem(24);
      font-weight: 600;
      background-color: #fcfcfc;
      transition: all 0.2s ease;
      color: #000;
      outline: none;
      @media (max-width: toEm(390)) {
         width: toRem(40);
         height: toRem(40);
         font-size: toRem(22);
      }
      &--active {
         border-color: $orangeColor;
      }

      &:disabled {
         background-color: #f5f5f5;
         cursor: default;
      }
   }
}

.field-game {
   &__attempt-num {
      font-size: toRem(20);
      flex: 0 0 toRem(29);
      margin-right: toRem(8);
   }

   &__attempt-show {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: toRem(8);

      span {
         border-radius: 50%;
         font-size: toRem(24);
         background-color: $orangeColor;
         transition: all 0.2s;
         color: #fff;
         width: toRem(40);
         height: toRem(40);
         flex: 0 0 toRem(40);
         display: inline-flex;
         justify-content: center;
         align-items: center;
         @media (max-width: toEm(390)) {
            width: toRem(30);
            height: toRem(30);
            flex: 0 0 toRem(30);
         }
      }

      &--active {
         span {
            background-color: #fff;
            border: 2px solid $orangeColor;
            color: #000;

            &:empty {
               border-color: #ccc;
            }
         }
      }

      &--disabled {
         span {
            background-color: #ccc;
            opacity: 0.5;
         }
      }
   }

   &__texts {
      display: flex;
      flex-direction: column;
      align-items: end;
      gap: toRem(8);
      flex: 0 0 toRem(70);
   }

   &__text {
      white-space: nowrap;
   }
}
</style>
