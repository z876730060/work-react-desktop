import axiosInstance from './../config/axios'

export function testApi() {
    return axiosInstance.get("/test")    
}