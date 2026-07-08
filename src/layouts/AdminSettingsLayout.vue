<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
   <Header>
      <h1>Admin settings</h1>
   </Header>
   <div class="settings">
      <div class="settings__container full-page-container">
         <RouterView />
      </div>
   </div>
   <Footer>
      <RouterLink :to="{ name: 'start' }" class="settings-button button">Save</RouterLink>
   </Footer>
</template>

<style scoped lang="scss">
h1 {
   font-size: toRem(24);
   font-weight: 600;
}
.settings {
   &__container {
      padding-top: toRem(104);
      padding-bottom: toRem(128);
   }
}
.settings-button {
   padding: toRem(12) toRem(16);
   border-radius: 16px;
   min-height: toRem(40);
   width: 100%;
}
</style>
