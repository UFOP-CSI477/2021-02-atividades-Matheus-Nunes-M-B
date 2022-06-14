<template>
  <img :src="avatar" alt="">
</template>
<style scoped>
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
<script setup lang="ts">

interface Props {
  avatar: string;
}

const { avatar } = defineProps<Props>();
</script>