<template>
  <Modal class="popup creating-session">
    <a class="close-btn" @click="(e) => {
      $emit('closed');
    }">Fechar</a>
    <slot />
  </Modal>
</template>
<style scoped>
.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  cursor: pointer;
}

.popup {
  position: fixed;
  z-index: 2;
  background: rgb(65, 65, 65);
  position: fixed;
  top: -10%;
  left: 50%;
  width: auto;
  min-width: 50%;
  transform: translate(-50%, 50%);
  border-radius: 10px;
  height: auto;
}
</style>
<script setup lang="ts">
interface Props {
  isModal?: boolean;
}
const { isModal } = defineProps<Props>();


defineEmits(['closed']);
</script>