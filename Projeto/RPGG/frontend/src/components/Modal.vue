<template>
  <div class="modal">
    <slot></slot>
  </div>
</template>
<style scoped>
.modal {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 80%;
  background: #2c2c2c;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 2px 2px #00000040;
  flex: 1 1;
  min-height: 100px;
  height: 90%;
}
</style>
<script setup lang="ts">

</script>