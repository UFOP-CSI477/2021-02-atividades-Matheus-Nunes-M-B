<template>
  <div class="sheets">
    <div class="header">
      <div class="sheet-info" v-if="sheet">

        <div class="sheet-info-title">
          <SessionSheetsAvatar :avatar="sheet.image" />
          <h1>{{ sheet.name }}</h1>

        </div>
        <div class="life-bar">
          <h1 class="life-bar-value">{{ sheet.health }}</h1>
          <div class="life-bar-progress" :style="{
            width: sheet.health + '%'
          }"></div>
        </div>
        Vida Atual:
        <div class="attributes">
          <div class="attribute">
            <div class="attribute-name">Força</div>
            <div class="attribute-value">{{ sheet.strength }}</div>
          </div>
          <div class="attribute">
            <div class="attribute-name">Destreza</div>
            <div class="attribute-value">{{ sheet.dexterity }}</div>
          </div>
          <div class="attribute">
            <div class="attribute-name">Constituição</div>
            <div class="attribute-value">{{ sheet.constitution }}</div>
          </div>
          <div class="attribute">
            <div class="attribute-name">Inteligência</div>
            <div class="attribute-value">{{ sheet.intelligence }}</div>
          </div>

        </div>
        <div class="sheet-option edit-sheet"> {{ sheet.alignment }} </div>
      </div>
      <div class="sheet-info" v-else>
        <button @click="() => { openCreatingSheet(); $emit('updated') }" class='sheet-option'> Create Sheet </button>
        <Popup class='create-sheet-popup' v-if="creatingSheet" @closed="closePopups()" @updated="closePopups();
        $emit('updated')">
          <SheetForm :user="user" :session="session" />
        </Popup>
      </div>
    </div>
    <hr width="100%">
    <div class="body">

    </div>
  </div>
</template>
<style scoped>
.create-sheet-popup {
  top: -11%;
}

.sheets {
  display: flex;
  flex-direction: column;
  width: 280px;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}


.sheet-info {
  width: 100%;
}

.sheet-info-title {
  width: 100%;
  display: flex;
  margin-bottom: 15px;
  align-items: center;
}

.sheet-info-title h1 {
  margin-left: 10px;
  font-size: 1.3em;
}

.life-bar {
  position: relative;
  width: 100%;
  background: none;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #000000a9;
}

.life-bar-progress {
  background-color: #feae96;
  background-image: linear-gradient(315deg, #feae96 0%, #fe0944 74%);
  box-shadow: 2px 2px 2px 2px #00000060;
  height: 30px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.life-bar-value {
  position: absolute;
  font-size: 1.4em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: right;
  font-weight: 700;
  -webkit-text-stroke: 0.8px black;
}

.sheet-option {
  margin-bottom: 5px;
  width: 100%;
  background: #5353b9;
  text-align: center;
}

.edit-sheet {
  border-radius: 20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.attributes {
  background: #467da1;
}

.attributes .attribute {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  border-bottom: #00000040 1px solid;
}

.attribute-value {
  font-size: 1.2em;
  background-color: white;
  padding: 5px 10px;
  color: black;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
}
</style>
<script setup lang="ts">
import { SessionEntity } from '~~/src/entities/session.entity';
import { SheetEntity, SheetRole } from '~~/src/entities/sheet.entity';
import { UserEntity } from '~~/src/entities/user.entity';

defineEmits(['updated'])

interface Props {
  session: SessionEntity;
  user: UserEntity;
}
const { session, user } = defineProps<Props>()


const hasSheet = ref(false)

const sheet = ref<SheetEntity | null>(null)
const { data: { value: sheets } } = await useFetch<SheetEntity[]>(`/api/user/${user.id}/session/${session.id}/sheet`)
if (sheets && sheets.length > 0) {
  sheet.value = sheets[0]
}
const creatingSheet = ref(false)
const closePopups = () => {
  creatingSheet.value = false
}
const openCreatingSheet = () => {
  closePopups()
  creatingSheet.value = true
}

</script>