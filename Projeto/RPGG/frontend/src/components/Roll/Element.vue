 <template>
  <div class="roll-container">
    <div class="header">
      <span class="time"> {{ date }}
        <br> Owner: {{ roll.ownerId }}
      </span>
      <h1>
        {{ roll.owner.name }} rolou um dado!!
        <br>
        <p>
          {{ roll.expression }}
        </p>
      </h1>
    </div>
    <div class="body">
      <div class="info">
        <h2>Total: {{ roll.total }}</h2>
        <h3>{{ roll.result }}</h3>
      </div>
    </div>
  </div>
</template>
<style scoped>
.roll-container {
  background: #00000040;
  margin: 5px;
  padding: 20px;
  margin-top: 15px;
  border-radius: 20px;
  box-shadow: 3px 3px 2px 0px #00000050;
  font-size: 0.75em;
}

h1,
h2,
h3 {
  padding: 0;
  margin: 0;
  word-wrap: wrap;
  max-width: 400px;
  overflow-wrap: break-word;
}

.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.time {
  position: absolute;
  color: #aaa;
  font-size: 12px;
  right: 15px;
  text-align: right;
}

h1 {
  font-size: 1.1em;
  margin: 0px;
  padding-bottom: 2px;
  display: inline;
}

h1 p {
  display: inline-block;
  padding: 0;
  margin: 0;
  margin-left: 20px;
  font-weight: 400;
  color: #ddd;
}
</style>
<script setup lang="ts">
import { RollEntity } from '~~/src/entities/roll.entity';


interface Props {
  roll: RollEntity;
}
const { roll } = defineProps<Props>()



const date = new Date(roll.createdAt);
const time = date.setHours(date.getHours() - 3)

</script>