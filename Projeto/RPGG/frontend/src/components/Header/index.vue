


<template>
  <div class="header">
    <HeaderLogo></HeaderLogo>
    <HeaderAvatar></HeaderAvatar>
  </div>
</template>
<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 10px;

  width: 100%;
  height: 75px;
  padding: 0px 80px;

  background: #393939;

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}
</style>
<script setup lang="ts">
</script>