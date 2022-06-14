<template>
  <div class="modal">
    <form @submit.prevent="onSubmit">
      <div class="form">
        <h1>RPGG</h1>
        <h2>Cadastrar Usuário</h2>
        <div class="form-control">
          <input v-model="body.name" class="input-text" id="name" type="text" placeholder="Name" />
        </div>
        <div class="form-control">
          <input v-model="body.username" class="input-text" id="username" type="text" placeholder="Username" />
        </div>
        <h2>Selecione o tipo de usuario</h2>
        <div class="form-control radio">
          <SelectableOptions :default-option="'player'" @optionChange="(type) => body.type = type"
            :options="types.options">
          </SelectableOptions>
        </div>
        <div class="form-control actions">
          <button class="action" type="submit">Cadastrar</button>
          <NuxtLink to="/user">Já tem uma conta?</NuxtLink>
        </div>
        <h1></h1>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import SelectableOptions from '~~/src/components/SelectableOptions/index.vue';
import { UserEntity } from '~~/src/entities/user.entity';
// Setup
const types = {
  options: { master: 'Mestre', player: 'Jogador' },
  defaultOption: 'player',
};


const body = {
  name: "",
  username: "",
  type: types.defaultOption
}

const onSubmit = async () => {
  const car = {
    cor: "Blue",
    configs: {
      wheels: 4
    }
  }
  const { data: { value: { id } }, error, pending, refresh } = await useFetch(
    '/api/user',
    {
      method: 'POST',
      body,
      pick: ['id']
    })
  return navigateTo({
    path: `/user/${id}`
  })
}

</script>

<style scoped>
.modal {
  margin-top: 40px;
}

.form {
  background: #333;
  margin: auto;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  padding: 8px;
}

.actions {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.actions .action {
  margin-top: 10px;
}

.form-control {
  padding: 15px;
  width: 80%;
  max-width: 340px;
}

.form-control .radio {
  display: flex;
  flex-direction: row;
  align-items: center;

  justify-content: center;
}

.form-control input[type='radio'] {
  border: 0px;
  width: 50px;
  height: 2em;
}

.form-control .input-text {
  padding: 10px;
  width: 100%;
}
</style>
