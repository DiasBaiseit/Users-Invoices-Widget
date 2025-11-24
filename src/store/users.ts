import { defineStore } from 'pinia';
import { getUsers, getUserById } from '../services/users';
import type { User } from '../types/user';

export const usersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    userDetails: null as User | null,
    loading: false,
    error: null as string | null
  }),
  actions: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;

      try {
        const res = await getUsers();
        console.log(res);
        this.users = res.data;
      } catch (e) {
        this.error = 'Failed to load';
      } finally {
        this.loading = false;
      }
    },
    async fetchUserById(id: number) {
      this.loading = true;
      this.error = null;

      try {
        const res = await getUserById(id);
        this.userDetails = res.data;
      } catch (e) {
        this.error = 'Ошибка загрузки пользователя';
      } finally {
        this.loading = false;
      }
    },
    updateUser(updated: Partial<User> & { id: number }) {
      this.users = this.users.map((user: User) =>
        user.id === updated.id ? { ...user, ...updated } : user
      )

      if (this.userDetails?.id === updated.id) {
        this.userDetails = { ...this.userDetails, ...updated }
      }
    }
  }
})
