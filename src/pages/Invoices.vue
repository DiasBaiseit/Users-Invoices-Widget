<template>
  <div class="invoices">

    <Button class="back-btn" @click="$router.push(`/users/${userId}`)">
      ← Назад
    </Button>

    <h2>Инвойсы пользователя №{{ userId }}</h2>

    <div v-if="store.loading">Загрузка...</div>
    <div v-if="store.error" class="error">{{ store.error }}</div>

    <p v-if="store.list.length === 0 && !store.loading" class="empty">
      Инвойсов пока нет
    </p>

    <table v-if="store.list.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Описание</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="i in store.list" :key="i.id">
          <td>{{ i.id }}</td>
          <td>{{ i.title }}</td>
          <td>{{ i.body }}</td>
          <td>
            <Button @click="$router.push(`/users/${userId}/invoices/${i.id}`)">
              Открыть
            </Button>
          </td>
        </tr>
      </tbody>
    </table>

    <Button class="create-btn" @click="$router.push(`/users/${userId}/invoices/create`)">
      + Создать инвойс
    </Button>

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { invoicesStore } from '../store/invoices';
import Button from '../components/Button.vue';

const store = invoicesStore();
const route = useRoute();

const userId = Number(route.params.id);

onMounted(() => {
  store.fetchInvoices(userId);
});
</script>

<style scoped>
.invoices {
  margin: 0 auto;
}

h2 {
  margin-bottom: 20px;
}

.empty {
  margin: 20px 0;
  color: #666;
  font-style: italic;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 25px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 12px 14px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

th {
  background: #f7f7f7;
  font-weight: 600;
}

tr:hover {
  background: #f5f5f5;
}

.status {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
}

.status.paid {
  background: #d2f5d2;
  color: #2b7f2b;
}

.status.unpaid {
  background: #ffe0df;
  color: #d6453d;
}

.desc {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.create-btn {
  margin-top: 10px;
}
</style>
