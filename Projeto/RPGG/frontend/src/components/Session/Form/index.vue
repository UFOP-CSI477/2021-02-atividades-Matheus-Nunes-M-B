<template>
  <div class="session-form">
    <hr width="100%">
    <div class="header">
      <button :disabled="editing" @click="editing = true">Editar</button>
      <button :disabled="!editing" class="btn-primary" @click="saveEdition()">Salvar</button>
      <button :disabled="!editing" class="btn-danger" @click="cancelEdition()">Cancelar</button>

    </div>
    <div class="body">
      {{ session.name }}
    </div>
  </div>
</template>
<style scoped>
.session-form {
  width: 100%;
}

.body,
.header,
.footer {
  display: flex;
  justify-content: center;
}

.header button {
  margin-right: 5px;
  margin-left: 5px;
}
</style>
<script setup lang="ts">
import { SessionEntity } from '~~/src/entities/session.entity';


const editingSession = {
  name: '',
}

interface Props {
  session: SessionEntity
}
const { session } = defineProps<Props>()


const editing = ref(false)

const saveEdition = () => { }
const cancelEdition = () => {
  editing.value = false
}

</script>