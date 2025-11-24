<template>
  <div class="invoice-create">
    
    <Button class="back-btn" @click="$router.push(`/users/${userId}/invoices`)">
      ← Назад
    </Button>

    <h1>Создать инвойс</h1>

    <form @submit.prevent="submit">

      <div class="form-group">
        <Input v-model="form.number" label="Номер инвойса" required />
      </div>

      <div class="form-group">
        <Input v-model="form.date" type="date" label="Дата" required />
      </div>

      <div class="form-group">
        <Input v-model="form.amount" type="number" label="Сумма" required />
      </div>

      <div class="form-group">
        <label>Статус</label>
        <select v-model="form.status" class="select">
          <option value="paid">Оплачен</option>
          <option value="unpaid">Не оплачен</option>
        </select>
      </div>

      <div class="form-group">
        <label>Описание</label>
        <textarea
          v-model="form.description"
          class="textarea"
        ></textarea>
      </div>

      <Button type="submit">Создать</Button>
    </form>

  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { invoicesStore } from '../store/invoices';
import Button from '../components/Button.vue';
import Input from '../components/Input.vue';

const route = useRoute();
const router = useRouter();
const store = invoicesStore();

const userId = Number(route.params.id);

const form = reactive({
  number: "",
  date: "",
  amount: "",
  status: "unpaid",
  description: ""
});

const submit = () => {
  store.addInvoice({
    id: Date.now(),
    userId,
    ...form
  });

  router.push(`/users/${userId}/invoices`);
};
</script>

<style scoped>
.invoice-create {
  margin: auto;
}

.form-group {
  margin-bottom: 15px;
  max-width: 500px;
}

.select, .textarea {
  width: 100%;
  padding: 10px;
}
</style>
