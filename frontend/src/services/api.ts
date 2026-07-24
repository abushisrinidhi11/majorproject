import axios from "axios";

console.log("Creating Axios Instance");

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    withCredentials: true
    // No default Content-Type here: axios sets "application/json" for
    // plain objects and the correct multipart boundary for FormData
    // automatically. A hardcoded default breaks file uploads.
});

console.log("Axios Instance Created");

export default api;