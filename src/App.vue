<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useSettingsStore } from '@/stores/settingsStore';

const settingsStore = useSettingsStore();
onMounted(() => {
   settingsStore.setTheme(settingsStore.appTheme);
});
</script>

<template>
   <RouterView />
</template>

<style lang="scss" scoped></style>
