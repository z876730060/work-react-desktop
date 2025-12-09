import axiosInstance from './../config/axios';

export function healthApi() {
    return axiosInstance.get("/health");
}