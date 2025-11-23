<template>
  <div class="invoice-view">

    <Button @click="$router.push(`/users/${userId}/invoices`)">
      ← Назад
    </Button>

    <h1>Инвойс №{{ invoice.id }}</h1>

    <p><b>Название:</b> {{ invoice.title }}</p>
    <p><b>Описание:</b> {{ invoice.body }}</p>

  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { invoicesStore } from "@/store/invoices";
import Button from "@/components/Button.vue";

const route = useRoute();
const store = invoicesStore();

const userId = Number(route.params.id);
const invoiceId = Number(route.params.invoiceId);

const invoice = store.list.find(i => i.id === invoiceId);
</script>
