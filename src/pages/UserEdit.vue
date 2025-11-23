<template>
  <div class="edit-user">

    <Button class="back-btn" @click="$router.push(`/users/${userId}`)">
      ← Назад
    </Button>

    <h2>Редактирование пользователя</h2>

    <div v-if="loading">Загрузка...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <form v-if="!loading && !error" @submit.prevent="save">

      <div class="form-group">
        <Input v-model="name" label="Имя" type="text" required />
      </div>

      <div class="form-group">
        <Input v-model="email" label="Email" type="email" required />
      </div>

      <div class="form-group">
        <Input v-model="phone" label="Телефон" type="text" required />
      </div>

      <div class="buttons">
        <Button type="submit" class="save-btn">Сохранить</Button>
      </div>

    </form>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getUserById } from '@/services/users';
import { usersStore } from '@/store/users';
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';

const route = useRoute();
const router = useRouter();
const store = usersStore();

const userId = Number(route.params.id);

const name = ref('');
const email = ref('');
const phone = ref('');

const loading = ref(false);
const error = ref<string | null>(null);

onMounted(async () => {
  loading.value = true;
  try {
    const res = await getUserById(userId);
    const user = res.data;

    name.value = user.name;
    email.value = user.email;
    phone.value = user.phone;
  } catch (e) {
    error.value = 'Не удалось загрузить пользователя';
  } finally {
    loading.value = false;
  }
})

async function save() {
  
  if (!name.value.trim()) {
    error.value = 'Имя не может быть пустым';
    return;
  }
  if (!email.value.includes('@')) {
    error.value = 'Email некорректный';
    return;
  }

  const updatedUser = {
    id: userId,
    name: name.value,
    email: email.value,
    phone: phone.value
  };

  store.updateUser(updatedUser);

  router.push(`/users/${userId}`);
}
</script>

<style scoped>
.edit-user {
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
  max-width: 500px;
}

input {
  width: 100%;
  padding: 8px;
}

.error {
  color: red;
}

.buttons {
  margin-top: 20px;
}

.save-btn {
  padding: 8px 15px;
}
</style>
