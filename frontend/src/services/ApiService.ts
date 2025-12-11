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

export interface RouteRequest {
	fromStationId: string;
	toStationId: string;
	analyticCode: string;
}

export interface RouteResponse {
	id: string;
	from_station_id: string;
	to_station_id: string;
	analytic_code: string;
	distance_km: number;
	path: string[];
	created_at: string;
}

export interface StatsResponse {
	items: Array<{
		analyticCode: string;
		totalDistanceKm: number;
	}>;
}

export default {
	createRoute(data: RouteRequest) {
		return apiClient.post<RouteResponse>("/routes", data);
	},

	getStats(params?: { from?: string; to?: string }) {
		return apiClient.get<StatsResponse>("/stats/distances", { params });
	},
};
