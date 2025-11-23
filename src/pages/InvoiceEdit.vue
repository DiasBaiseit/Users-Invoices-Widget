<template>
  <div class="invoice-edit">

    <Button @click="$router.push(`/users/${userId}/invoices/${invoice.id}`)">
      ← Назад
    </Button>

    <h1>Редактировать инвойс</h1>

    <form @submit.prevent="save">

      <Input v-model="form.number" label="Номер" />
      <Input v-model="form.date" type="date" label="Дата" />
      <Input v-model="form.amount" type="number" label="Сумма" />

      <label>Статус</label>
      <select v-model="form.status">
        <option value="paid">Оплачен</option>
        <option value="unpaid">Не оплачен</option>
      </select>

      <label>Описание</label>
      <textarea v-model="form.description"></textarea>

      <Button type="submit">Сохранить</Button>

    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { invoicesStore } from "@/store/invoices";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";

const route = useRoute();
const router = useRouter();
const store = invoicesStore();

const userId = Number(route.params.id);
const invoiceId = Number(route.params.invoiceId);

const invoice = store.getInvoice(invoiceId);

const form = reactive({...invoice});

const save = () => {
  store.updateInvoice(invoiceId, form);
  router.push(`/users/${userId}/invoices/${invoiceId}`);
};
</script>
