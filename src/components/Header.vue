<template>
   <header class="header">
      <div class="header__container">
         <slot></slot>
      </div>
   </header>
</template>

<style lang="scss" scoped>
.header {
   &__container {
      background-color: #fff;
      position: fixed;
      padding: 32px 8px 16px;
      border-radius: 0px 0px 16px 16px;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0px);
      z-index: 5;
      width: 100%;
   }
}
</style>
