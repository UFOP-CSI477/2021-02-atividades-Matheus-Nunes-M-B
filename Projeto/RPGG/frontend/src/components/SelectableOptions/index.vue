<template>
  <div class="options">
    <div v-for="option of Object.keys(options)" :key="option" class="option">
      <button type="button" :class="optionSelected == option ? 'option-selected' : ''" @click="
        (e) => {
          if (option !== optionSelected) {
            $emit('optionChange', option);
            setOptionSelected(option);
          }
        }
      ">
        {{ options[option] }}
      </button>
    </div>
  </div>
</template>
<style scoped>
.option-selected {
  background: #666;
  color: #fff;
}

.options {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.option {
  display: flex;
  align-items: center;
}

.option label {
  min-width: 80px;
}
</style>
<script setup lang="ts">

interface Props {
  options: { [key: string]: string };
  defaultOption?: string;
}
const { defaultOption, options } = defineProps<Props>();

defineEmits(['optionChange']);
const optionSelected = ref(defaultOption as string);
const setOptionSelected = (option: string) => {
  optionSelected.value = option;
};
</script>
