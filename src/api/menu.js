import axiosInstance from './../config/axios';

export function getMenuApi() {
    return axiosInstance.get("/menu");
}

export function getMenuListApi(data) {
    return axiosInstance.post("/menu/list", data);
}

export function addMenuApi(data) {
    return axiosInstance.post("/menu", data);
}

export function delMenuApi(id) {
    return axiosInstance.delete(`/menu/${id}`);
}

export function getBreadcrumbApi(path) {
    return axiosInstance.get(`/breadcrumb?path=${path}`);
}

export function getMenuDetailApi(id) {
    return axiosInstance.get(`/menu/${id}`);
}

export function updateMenuApi(data) {
    return axiosInstance.put("/menu", data);
}

export function getTreeMenuApi() {
    return axiosInstance.get("/menu/tree");
}