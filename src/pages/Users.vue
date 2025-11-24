<template>
  <div class="users-page">

    <div class="users-page-header">
      <h1>Пользователи</h1>

      <div class="users-page-header-right">
        <Button @click="store.fetchUsers" class="refresh-btn">
          Обновить
        </Button>

        <Input
          v-model="search"
          placeholder="Поиск по имени или email..."
          class="search-input"
        />
      </div>
    </div>

    <div v-if="store.loading">Загрузка...</div>

    <div v-if="store.error" class="error">{{ store.error }}</div>

    <table class="users-page-table" v-if="!store.loading && !store.error">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Email</th>
          <th>Компания</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id" @click="$router.push(`/users/${user.id}`)">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.company.name }}</td>
          <td>{{ user.address.city }}</td>
          <td>
            <Button @click="$router.push(`/users/${user.id}/edit`)">
              <img src="@/assets/icons/pencil.svg" class="icon" />
            </Button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { usersStore } from '../store/users';
import Button from '../components/Button.vue';
import Input from '../components/Input.vue';

const store = usersStore();

const search = ref('');

console.log(store);

const filteredUsers = computed(() => {
  if (!search.value) return store.users;

  return store.users.filter((user: any) =>
    user.name.toLowerCase().includes(search.value.toLowerCase()) ||
    user.email.toLowerCase().includes(search.value.toLowerCase())
  );
});

onMounted(() => {
  store.fetchUsers();
})
</script>

<style scoped>
.users-page {
  margin: 0 auto;
  padding: 20px;
}

.users-page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.users-page-header-right {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 8px;
  margin: 10px 0;
  width: 60%;
}

.refresh-btn {
  margin-right: 10px;
  padding: 8px 12px;
}

.users-page-table {
  width: 100%;
}

.users-page-table tr {
  cursor: pointer;
}

.users-page-table tr:hover {
  background: #f5f5f5;
}

.users-page-table th {
  padding: 5px 0;
}

.users-page-table td {
  text-align: center;
  padding: 5px 0;
}

.error {
  color: red;
  margin: 10px 0;
}
</style>
