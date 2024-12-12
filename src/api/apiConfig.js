import axios from 'axios';
import { useStoreZ } from '../store/zustand/zustand';

const axiosConfigDefault = {
    baseURL: 'https://backend-facturacion-production.up.railway.app/api/v1',
    responseType: 'json',
    timeout: 20000,
    headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': true,
        Pragma: 'no-cache',
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
};

export const Api = axios.create(axiosConfigDefault);

// Interceptor to add the token to headers
Api.interceptors.request.use(
    (config) => {
        const token = useStoreZ.getState().token; // Get the token from Zustand store
        const tokenLocal = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else if (tokenLocal) {
            config.headers.Authorization = `Bearer ${tokenLocal}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default Api;
