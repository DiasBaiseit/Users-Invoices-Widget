import axios from 'axios';

const BASE = 'https://jsonplaceholder.typicode.com';

export const getInvoicesByUser = async (userId: number) => {
  return await axios.get(`${BASE}/posts?userId=${userId}`);
};
