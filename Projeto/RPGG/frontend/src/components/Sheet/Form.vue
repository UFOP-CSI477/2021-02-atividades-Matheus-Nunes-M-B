<template>
  <div class="sheet-container form">
    <div class="header">
      <h1>Criar Nova Ficha</h1>
    </div>
    <div class="body">
      <div>
      <h2>Caracteristicas</h2>
      <div class='form-control'><input type="text" placeholder="name" v-model="body.name"></div>
      <div class='form-control'><input type="text" placeholder="gender" v-model="body.gender"></div>
      <div class='form-control'><input type="text" placeholder="image" v-model="body.image"></div>
      <div class='form-control'><input type="text" placeholder="alignment" v-model="body.alignment"></div>
      <div class='form-control'><input type="text" placeholder="background" v-model="body.background"></div>
    </div>
    <div>
      <h2>Informações</h2>
      <div class='form-control'><input type="text" placeholder="role" v-model="body.role"></div>
      <div class='form-control'><input type="text" placeholder="strength" v-model="body.strength"></div>
      <div class='form-control'><input type="text" placeholder="dexterity" v-model="body.dexterity"></div>
      <div class='form-control'><input type="text" placeholder="intelligence" v-model="body.intelligence"></div>
      <div class='form-control'><input type="text" placeholder="constitution" v-model="body.constitution"></div>
      </div>
    </div>
    <div class="footerform-control-actions">
      <button class="btn-danger" @click="$emit('closed')">Cancelar</button>
      <button class="btn-primary" @click="createSheet(); $emit('closed'); $emit('updated')">Criar</button>
    </div>
  </div>
</template>
<style scoped>
@import '~/styles/form.style.css';

.sheet-container {
  width: 100%;
  flex: 1 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

}
.body{display: flex;
padding: 15px;}
</style>
<script setup lang="ts">
import { SessionEntity } from '~~/src/entities/session.entity';
import { UserEntity } from '~~/src/entities/user.entity';

interface Props {
  session: SessionEntity;
  user: UserEntity;
}

const { session, user } = defineProps<Props>();
const { $emit } = useNuxtApp()

const body = ref({
  name: "",
  gender: "",
  image: "",
  alignment: "",
  background: "",
  role: "",
  strength: "",
  dexterity: "",
  intelligence: "",
  constitution: "",
})
const errors = ref<any>()
const isPending = ref<any>()

const createSheet = async () => {
  const { data, error, pending } = await useFetch(`/api/user/${user.id}/session/${session.id}/sheet`, {
    method: "POST",
    body: body.value
  })
  errors.value = error
  watch(error, (error) => {
    errors.value = error
  })
  errors.value = error
  watch(error, (error) => {
    errors.value = error
  })
  isPending.value = pending
  watch(pending, (pending) => {
    isPending.value = pending
  })
}
</script>