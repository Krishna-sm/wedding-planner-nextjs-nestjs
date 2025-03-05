import axios from "axios";

export const axiosClient = axios.create({
    baseURL:'http://localhost:1234/api/v1'
})