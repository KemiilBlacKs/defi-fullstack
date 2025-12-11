import { defineStore } from "pinia";
import { ref } from "vue";
import type { RouteResponse } from "../services/ApiService";

export const useRouteCalculatorStore = defineStore("routeCalculator", () => {
	const fromStation = ref("");
	const toStation = ref("");
	const analyticCode = ref("");
	const result = ref<RouteResponse | null>(null);
	const error = ref("");
	const analyticCodeHistory = ref<string[]>([]);

	function reset() {
		fromStation.value = "";
		toStation.value = "";
		analyticCode.value = "";
		result.value = null;
		error.value = "";
	}

	function setResult(data: RouteResponse) {
		result.value = data;
		error.value = "";
	}

	function setError(message: string) {
		error.value = message;
		result.value = null;
	}

	function addToHistory(code: string) {
		if (code && !analyticCodeHistory.value.includes(code)) {
			analyticCodeHistory.value.unshift(code);
			// Conserver uniquement les 10 derniers codes
			if (analyticCodeHistory.value.length > 10) {
				analyticCodeHistory.value.pop();
			}
		}
	}

	return {
		fromStation,
		toStation,
		analyticCode,
		result,
		error,
		analyticCodeHistory,
		reset,
		setResult,
		setError,
		addToHistory,
	};
});
