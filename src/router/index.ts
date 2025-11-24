import { createRouter, createWebHashHistory } from 'vue-router';
import Users from '../pages/Users.vue';
import UserEdit from '../pages/UserEdit.vue';
import UserDetails from '../pages/UserDetails.vue';
import Invoices from '../pages/Invoices.vue';
import InvoiceCreate from '../pages/InvoiceCreate.vue';
import InvoiceView from '../pages/InvoiceView.vue';
import InvoiceEdit from '../pages/InvoiceEdit.vue';

const routes = [
  { path: '/', redirect: '/users' },

  {
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/users/:id',
    name: 'user-details',
    component: UserDetails
  },
  {
    path: '/users/:id/invoices',
    name: 'invoices',
    component: Invoices
  },
  {
    path: '/users/:id/edit',
    name: 'user-edit',
    component: UserEdit
  },
  {
    path: "/users/:id/invoices/create",
    name: "invoice-create",
    component: InvoiceCreate
  },
  {
    path: "/users/:id/invoices/:invoiceId",
    component: InvoiceView
  },
  {
    path: "/users/:id/invoices/:invoiceId/edit",
    component: InvoiceEdit
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
