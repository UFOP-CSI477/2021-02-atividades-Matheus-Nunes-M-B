


<template>
  <div v-if="user">
    <!-- <NuxtLink :to="`/user/${user.id}`">
      <img :src="user.avatar" alt="">
    </NuxtLink> -->
  </div>
</template>
<style scoped>
img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}
</style>

<script setup lang="ts">
import { UserEntity } from '~~/src/entities/user.entity';


const user = ref(false)

</script>