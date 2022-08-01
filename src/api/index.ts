// const API = 'http://localhost:8000';
import axios from 'axios';

export const getAll = async (baseUrl: string) => axios(`${baseUrl}`);
export const create = async (baseUrl: string, data: any) => axios.post(`${baseUrl}`, data);
export const update = async (baseUrl: string, data: any) => axios.put(`${baseUrl}/${data.id}`, data);
export const deleteById = async (baseUrl: string, id: any) => axios.delete(`${baseUrl}/${id}`);

export const getHeaders = async (baseUrl: string) => axios(`${baseUrl}/table`);
export const getFormCreate = async (baseUrl: string) => axios(`${baseUrl}/post`);
export const getFormUpdate = async (baseUrl: string) => axios(`${baseUrl}/patch`);
