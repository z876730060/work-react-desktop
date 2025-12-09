import axiosInstance from '@/config/axios';

export function getMicroAppListApi(data) {
    return axiosInstance.post("/micro-app/list", data);
}

export function addMicroAppApi(data) {
    return axiosInstance.post("/micro-app", data);
}

export function delMicroAppApi(id) {
    return axiosInstance.delete(`/micro-app/${id}`);
}

export function getMicroAppDetailApi(id) {
    return axiosInstance.get(`/micro-app/${id}`);
}

export function updateMicroAppApi(data) {
    return axiosInstance.put("/micro-app", data);
}

export function getMicroAppSelectApi() {
    return axiosInstance.get("/micro-app/select");
}

export function getMicroAppDetailByKeyApi(key) {
    return axiosInstance.get(`/micro-app/key/${key}`);
}