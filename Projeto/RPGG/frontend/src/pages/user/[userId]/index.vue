<template>
  <Modal class="profile">
    <div class="header session-options">
      <button @click="openCreateSession()">Create Session</button>
      <button @click="openJoinSession()">Join Session</button>
      <Popup v-if="creatingSession" @closed="closeModals()">
        <SessionCreate :user="user" />
      </Popup>
      <Popup v-if="joiningSession" @closed="closeModals()">
        <SessionJoin :user="user" />
      </Popup>
    </div>
    <div class="body options">
      <SessionList title="Sessões Que Participo" :sessions="sessions"></SessionList>
      <SessionList mySessions title="Minhas Sessões" :sessions="mySessions"></SessionList>
    </div>
  </Modal>
</template>
<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1 1;
}

.profile .header,
.profile .body {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.profile .header {
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 0px;
}

.session-options {
  margin-top: 50px;
}

.session-options button {
  width: 200px;
  margin: 15px;
}
</style>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"]
})

const { params } = useRoute()

const { data: user, refresh } = await useFetch(
  `/api/user/${params.userId}`
)

const sessions = ref(user.value.sessions)
const mySessions = ref(user.value.mySessions)

const creatingSession = ref(false)
const joiningSession = ref(false)

const closeModals = () => {
  creatingSession.value = false
  joiningSession.value = false
}

const openCreateSession = () => {
  closeModals()
  creatingSession.value = true
}
const openJoinSession = () => {
  closeModals()
  joiningSession.value = true
}

</script>
