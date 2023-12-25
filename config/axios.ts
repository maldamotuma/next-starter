import axios from "axios";
import { server_url } from "./variables";

export default axios.create({
    baseURL: `${server_url}/api/admin`,
    withCredentials: true,
    withXSRFToken: true
});

export const baseURL = axios.create({
    baseURL: server_url,
    withCredentials: true,
    withXSRFToken: true
});