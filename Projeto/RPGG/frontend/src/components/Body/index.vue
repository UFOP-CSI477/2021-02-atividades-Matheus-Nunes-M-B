<template>
  <div class="body">
    <slot />
  </div>
</template>
<style scoped>
.body {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 80%;
  flex-grow: 1;
}
</style>
<script setup lang="ts"></script>