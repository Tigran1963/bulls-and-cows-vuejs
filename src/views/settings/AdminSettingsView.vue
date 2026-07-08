<script setup>
import { ref } from 'vue';
import { useSettingsStore } from '@/stores/settingsStore';

const settingsStore = useSettingsStore();

const newId = ref('');
const newName = ref('');
const newMaxAttempts = ref(8);
const newCodeLength = ref(4);

const createDifficulty = () => {
   if (!newName.value.trim()) {
      alert('Please enter a difficulty name');
      return;
   }

   const id = newId.value.trim() || newName.value.toLowerCase().replace(/\s+/g, '-');

   const exists = settingsStore.difficulties.some((d) => d.id === id);
   if (exists) {
      alert('A difficulty with this ID/Name already exists!');
      return;
   }

   const newDifficulty = {
      id: id,
      name: newName.value,
      maxAttempts: parseInt(newMaxAttempts.value),
      codeLength: parseInt(newCodeLength.value),
   };

   settingsStore.difficulties.push(newDifficulty);
   localStorage.setItem('game_difficulties', JSON.stringify(settingsStore.difficulties));

   newId.value = '';
   newName.value = '';
   newMaxAttempts.value = 8;
   newCodeLength.value = 4;

   alert('New difficulty level added successfully!');
};

const deleteDifficulty = (id) => {
   if (settingsStore.currentDifficultyId === id) {
      alert('Cannot delete the currently active difficulty level!');
      return;
   }
   if (confirm('Are you sure you want to delete this difficulty?')) {
      settingsStore.difficulties = settingsStore.difficulties.filter((d) => d.id !== id);
      localStorage.setItem('game_difficulties', JSON.stringify(settingsStore.difficulties));
   }
};
</script>

<template>
   <div class="settings__section">
      <h2 class="settings__section-title">Manage Existing Difficulties</h2>
      <div class="admin-list">
         <div v-for="diff in settingsStore.difficulties" :key="diff.id" class="admin-list__item">
            <div class="admin-list__header">
               <div class="admin-list__name">
                  {{ diff.name }}
                  <span>(id: {{ diff.id }})</span>
               </div>
               <button @click="deleteDifficulty(diff.id)" class="admin-list__delete-btn" title="Delete level">✕</button>
            </div>
            <div class="admin-list__controls">
               <label class="admin-list__field">
                  <span>Attempts:</span>
                  <input
                     type="number"
                     min="1"
                     max="12"
                     :value="diff.maxAttempts"
                     @input="settingsStore.updateDifficultyParams(diff.id, { maxAttempts: $event.target.value })"
                  />
               </label>
               <label class="admin-list__field">
                  <span>Code Length:</span>
                  <input
                     type="number"
                     min="1"
                     max="5"
                     :value="diff.codeLength"
                     @input="settingsStore.updateDifficultyParams(diff.id, { codeLength: $event.target.value })"
                  />
               </label>
            </div>
         </div>
      </div>
   </div>

   <div class="settings__section">
      <h2 class="settings__section-title">Create New Difficulty</h2>
      <form @submit.prevent="createDifficulty" class="admin-form">
         <div class="admin-form__field">
            <label>Display Name:</label>
            <input type="text" v-model="newName" placeholder="ex. Super Easy" required />
         </div>
         <div class="admin-form__field">
            <label>Unique ID (Optional):</label>
            <input type="text" v-model="newId" placeholder="ex. easy-peasy" />
         </div>
         <div class="admin-form__row">
            <div class="admin-form__field">
               <label>Max Attempts:</label>
               <input type="number" min="1" max="12" v-model="newMaxAttempts" required />
            </div>
            <div class="admin-form__field">
               <label>Code Length:</label>
               <input type="number" min="1" max="5" v-model="newCodeLength" required />
            </div>
         </div>
         <button type="submit" class="button admin-form__submit">Add Level</button>
      </form>
   </div>
</template>

<style lang="scss" scoped>
.settings {
   &__section {
      width: 100%;
      background: #fcfcfc;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: toRem(16);
      &:not(:last-child) {
         margin-bottom: toRem(16);
      }
   }

   &__section-title {
      font-size: toRem(18);
      font-weight: 600;
      margin-bottom: toRem(16);
      padding-bottom: toRem(8);
   }
}
.admin-list {
   display: flex;
   flex-direction: column;
   gap: toRem(16);

   &__item {
      background: #f5f5f5;
      padding: toRem(12);
      border-radius: 12px;
   }

   &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: toRem(8);
   }

   &__name {
      font-weight: 600;
      font-size: toRem(16);
      span {
         font-weight: 400;
         color: #777;
      }
   }

   &__delete-btn {
      background: none;
      border: none;
      color: #ff6b6b;
      font-size: toRem(18);
      cursor: pointer;
      padding: toRem(4);

      &:hover {
         transform: scale(1.1);
      }
   }

   &__controls {
      display: flex;
      gap: toRem(16);
   }

   &__field {
      display: flex;
      align-items: center;
      gap: toRem(8);
      font-size: toRem(14);

      input {
         width: toRem(60);
         padding: toRem(4) toRem(8);
         border: 1px solid #ccc;
         border-radius: 8px;
         text-align: center;
      }
   }
}

.admin-form {
   display: flex;
   flex-direction: column;
   gap: toRem(12);

   &__field {
      display: flex;
      flex-direction: column;
      gap: toRem(4);

      label {
         font-size: toRem(14);
         font-weight: 500;
      }

      input {
         padding: toRem(10);
         border: 1px solid #ccc;
         border-radius: 8px;
         font-size: toRem(15);
      }
   }

   &__row {
      display: flex;
      gap: toRem(12);

      .admin-form__field {
         flex: 1;
      }
   }

   &__submit {
      margin-top: toRem(8);
      background-color: $orangeColor;
      color: white;
      padding: toRem(12);
      border-radius: 12px;
   }
}
</style>
