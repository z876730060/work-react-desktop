import axiosInstance from '@/config/axios';

export function logApi(data) {
    return axiosInstance.post("/log", data);
}