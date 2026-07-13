<script setup>
import { onMounted, computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useSettingsStore } from '@/stores/settingsStore';
import DefaultLayout from './layouts/DefaultLayout.vue';
import AdminSettingsLayout from './layouts/AdminSettingsLayout.vue';
import UserSettingsLayout from './layouts/UserSettingsLayout.vue';

const route = useRoute();
const layouts = {
   default: DefaultLayout,
   userSettings: UserSettingsLayout,
   adminSettings: AdminSettingsLayout,
};
const currentLayout = computed(() => {
   const layoutName = route.meta.layout || 'default';
   return layouts[layoutName] || layouts.default;
});

const settingsStore = useSettingsStore();
onMounted(() => {
   settingsStore.setTheme(settingsStore.appTheme);
});
</script>

<template>
   <component :is="currentLayout">
      <RouterView />
   </component>
</template>

<style lang="scss" scoped></style>
