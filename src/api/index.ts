const API = 'http://localhost:8000';
import axios from 'axios';

export const getAll = async () => axios(`${API}/users`);
export const create = async (data: any) => axios.post(`${API}/user`, data);
export const update = async (data: any) => axios.put(`${API}/user/${data.id}`, data);
export const deleteById = async (id: any) => axios.delete(`${API}/user/${id}`);

export const getFormCreate = async (url: string) => axios(`${API}/${url}`);
export const getFormUpdate = async (url: string) => axios(`${API}/${url}`);
