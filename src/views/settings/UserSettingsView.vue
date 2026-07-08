<script setup>
import { useGameStore } from '@/store/gameStore';

const store = useGameStore();
</script>

<template>
   <div class="settings">
      <div class="settings__container full-page-container">
         <div class="settings__body">
            <RouterLink :to="{ name: 'start' }" class="settings__button button">Back to start page</RouterLink>
         </div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.settings {

   &__button {
      padding: toRem(12) toRem(16);
      border-radius: 16px;
      min-height: toRem(40);
      width: 100%;
   }
}
</style>
