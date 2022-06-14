<template>
  <div class="rolls-container">
    <div class="body">
      <div class="elements">
        <RollElement v-for="roll of rolls" :key="roll.id" :roll=roll />

      </div>
    </div>
    <div class="footter">
      <form @submit.prevent="rollDice">
        <input v-model="expression" type="text" placeholder="Role seus dados" :disabled="isPending" />
        <button type="submit"><img src="~/assets/Arrow.svg"></button>
      </form>
    </div>
  </div>
</template>
<style scoped>
.rolls-container {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: #00000020;
  padding: 10px;
  border-radius: 20px;
}

.body {
  flex: 1 1;
}

.elements {
  position: relative;
  flex-grow: 0;
  overflow: hidden;
  max-height: 961px;
  align-self: flex-end;
  overflow-y: auto;
}

.footer,
form {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

button img {
  background: #00000030;
  box-shadow: 3px 3px 2px 0px #00000040 inset;
  color: white;
  width: 45px;
  height: 45px;
  padding: 10px;
  margin-right: 0px;
  border-radius: 50%;
}

button img:hover {
  background: #00000011;
}

.footer button,
form button {
  background: none;
  box-shadow: none;
}

.footer button:hover,
form button:hover {
  cursor: pointer;
}

.footer input,
form input {
  width: 100%;
  border-radius: 15px;
  height: 100%;
  background: #00000030;
  border: none;
  outline: none;
  box-shadow: 3px 3px 2px 0px #00000040 inset;
  font-family: "Roboto", sans-serif;
  font-size: 1.2em;
  color: white;
  padding-left: 20px;

}
</style>
<script setup lang="ts">
import { RollEntity } from '~~/src/entities/roll.entity';
import { SessionEntity } from '~~/src/entities/session.entity';
import { UserEntity } from '~~/src/entities/user.entity';

interface Props {
  user: UserEntity;
  session: SessionEntity;
}
const { user, session } = defineProps<Props>()

const expression = ref("")

const rawRolls = ref<RollEntity[]>([])
const rolls = computed(() => {
  if (!rawRolls.value) return []
  return rawRolls.value.sort(((rollA: RollEntity, rollB: RollEntity) => {
    return new Date(rollA.createdAt) > new Date(rollB.createdAt)
  }) as any)
})

const { data } = await useFetch(`/api/session/${session.id}/roll`)
rawRolls.value = data.value as any

const isPending = ref(false)

const rollDice = async () => {
  const exprr = expression.value
  expression.value = ""
  const body: any = {
    sessionId: session.id,
    ownerId: user.id,
    expression: exprr,
  }
  const { data: roll, pending } = useFetch<RollEntity>(`/api/roll`, {
    method: "POST",
    body,
  })
  rawRolls.value.push(roll.value as any)
  return roll
}



</script>