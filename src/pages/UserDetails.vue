<template>
  <div class="user-details">

    <Button class="back-btn" @click="$router.push('/users')">
      ← Назад
    </Button>

    <div v-if="store.loading">Загрузка...</div>
    <div v-if="store.error" class="error">{{ store.error }}</div>

    <div v-if="user" class="card">
      <h2>{{ user.name }}</h2>
      <p><b>Email:</b> {{ user.email }}</p>
      <p><b>Телефон:</b> {{ user.phone }}</p>
      <p><b>Сайт:</b> {{ user.website }}</p>
      <p><b>Адрес:</b> {{ user.address.street }}</p>
      <p><b>Компания:</b> {{ user.company.name }}</p>

      <Button @click="$router.push(`/users/${user.id}/edit`)">
        Редактировать
      </Button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usersStore } from '@/store/users';
import Button from '@/components/Button.vue';

const store = usersStore();
const route = useRoute();

const userId = Number(route.params.id);

onMounted(() => {
  store.fetchUserById(userId);
})

const user = computed(() =>
  store.users.find((user: any) => user.id === userId) || store.userDetails
);
</script>

<style scoped>
.card {
  border-radius: 8px;
}

.error {
  color: red;
}
</style>
