import axiosInstance from '@/config/axios';

export const getRoleListApi = (data) => {
    return axiosInstance.post("/role/list", data);
}

export const addRoleApi = (data) => {
    return axiosInstance.post("/role", data);
}

export const getRoleDetailApi = (id) => {
    return axiosInstance.get(`/role/${id}`);
}

export const updateRoleApi = (data) => {
    return axiosInstance.put("/role", data);
}

export const deleteRoleApi = (id) => {
    return axiosInstance.delete(`/role/${id}`);
}

export const getRoleTreeApi = () => {
    return axiosInstance.get("/role/tree");
}