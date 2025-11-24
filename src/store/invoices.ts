import { defineStore } from 'pinia';
import { getInvoicesByUser } from '../services/invoices';

export const invoicesStore = defineStore('invoices', {
  state: () => ({
    list: [] as any[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchInvoices(userId: number) {
      this.loading = true;
      this.error = null;

      try {
        const res = await getInvoicesByUser(userId);
        this.list = res.data;
      } catch (e) {
        this.error = 'Не удалось загрузить инвойсы';
      } finally {
        this.loading = false;
      }
    },
    addInvoice(invoice: any) {
      this.list.push(invoice);
    },
    getInvoice(id: number) {
      return this.list.find(i => i.id === id);
    },
    updateInvoice(id: number, data: any) {
      const index = this.list.findIndex(i => i.id === id);
      if (index !== -1) {
        this.list[index] = { ...this.list[index], ...data };
      }
    },
    deleteInvoice(id: number) {
      this.list = this.list.filter(i => i.id !== id);
    }
  }
})
