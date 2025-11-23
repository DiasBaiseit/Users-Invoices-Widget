import axios from 'axios';

const BASE = 'https://jsonplaceholder.typicode.com';

export const getUsers = async () => {
  return await axios.get(`${BASE}/users`);
};

export const getUserById = async (id: number) => {
  return await axios.get(`${BASE}/users/${id}`);
};
