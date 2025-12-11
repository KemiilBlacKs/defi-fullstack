import axios from "axios";
// In Docker, frontend calls backend via browser.
// If using Nginx proxy (not set up for path routing yet), we might need full URL.
// But Docker Compose maps backend:8000 and frontend:3000.
// Browser needs localhost:8000.
const apiClient = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
export default {
    createRoute(data) {
        return apiClient.post("/routes", data);
    },
    getStats(params) {
        return apiClient.get("/stats/distances", { params });
    },
};
