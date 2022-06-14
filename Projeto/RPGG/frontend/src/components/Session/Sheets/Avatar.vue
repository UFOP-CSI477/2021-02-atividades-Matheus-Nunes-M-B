<template>
  <img :src="avatar || 'https://cdn-icons-png.flaticon.com/512/803/803805.png'" alt="">
</template>
<style scoped>
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background: #4b7299;
}
</style>
<script setup lang="ts">
interface Props {
  avatar: string;
}
const { avatar } = defineProps<Props>()
</script>