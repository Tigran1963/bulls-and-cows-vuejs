<template>
   <footer class="footer">
      <div class="footer__container">
         <slot></slot>
      </div>
   </footer>
</template>

<style lang="scss" scoped>
.footer {
   &__container {
      background-color: #fff;
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0px);
      padding: 16px 8px 32px;
      border-radius: 16px 16px 0px 0;
      z-index: 5;
      width: 100%;
   }
}
</style>
