<template>
  <div class="session-list">
    <div class="head">
      <h1>{{ title }}</h1>
      <div class="search-bar">
        Pesquisa
        <input type="text" v-model="searchBy" />
      </div>
    </div>
    <div class="body">
      <ul>
        <li v-for="session of filteredSessions">
          <NuxtLink class="option" :to="`/session/${session.id}`">
            <SessionAvatar class="session-avatar"
              :avatar="session.avatar || 'https://thumbs.dreamstime.com/b/opte-pelo-avatar-placeholder-da-foto-%C3%ADcone-do-perfil-124557887.jpg'" />
            <span class="session-name">{{ session.name }}</span>
          </NuxtLink>
        </li>

      </ul>
    </div>
  </div>
</template>
<style scoped>
ul {
  padding: 0px;
}

.option,
li {
  text-decoration: none;
  list-style: none;
  color: white;
  font-size: 1.2em;
  display: flex;
  align-items: center;
}

.option {
  background: #ffffff10;
  padding: 5px;
  margin-bottom: 10px;
  flex: 1 1;
  padding-left: 20px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 2px #00000010;
}

.option:hover {
  background: #ffffff20;
}

li img {
  margin-right: 20px;
}

.option:hover {
  color: #ebebeb
}

.head,
.body {
  width: 80%;
}

.search-bar input {
  margin-top: 5px;
}



.session-list {
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: center;
  justify-content: center;
  padding: 10px;
  padding-left: 15px;
  flex: 1 1;
}

input {
  padding: 5px;
  font-size: 1.1em;
  width: 100%
}

.session-list h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.search-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.search-bar input {
  margin-left: 30px;
}
</style>
<script setup lang="ts">
import { Ref } from 'vue';
import { SessionEntity } from '~~/src/entities/session.entity';

const searchBy = ref("")


interface Props {
  title: string;
  sessions?: SessionEntity[];
  mySessions?: boolean;
}

const { title, sessions } = defineProps<Props>();

const filteredSessions = computed<SessionEntity[]>(() => {
  return sessions?.filter(session => session.name.includes(searchBy.value as string)) as SessionEntity[]
});

</script>