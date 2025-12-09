import axiosInstance from '@/config/axios';

export function getUserListApi(data) {
    return axiosInstance.post("/user/list", data);
}

export function addUserApi(data) {
    return axiosInstance.post("/user", data);
}

export function delUserApi(id) {
    return axiosInstance.delete(`/user/${id}`);
}

export function updateUserApi(data) {
    return axiosInstance.put("/user", data);
}

export function getUserDetailApi(id) {
    return axiosInstance.get(`/user/${id}`);
}

export function bindRoleApi(data) {
    return axiosInstance.post("/user/role", data);
}

export function getRoleApi(id) {
    return axiosInstance.get(`/user/role/${id}`);
}