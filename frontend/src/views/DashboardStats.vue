<template>
	<div>
		<!-- Hero Section -->
		<div class="d-flex flex-wrap align-center justify-space-between py-8 mb-6 ga-4">
			<div>
				<h1 class="text-h3 font-weight-bold mb-2">Tableau de bord</h1>
				<p class="text-body-1 text-medium-emphasis mb-0">
					Analysez l'historique des trajets par code analytique.
				</p>
			</div>
			<v-btn
				color="primary"
				variant="tonal"
				size="large"
				prepend-icon="mdi-refresh"
				@click="fetchStats"
				:loading="loading"
			>
				Actualiser
			</v-btn>
		</div>

		<!-- Filters Card -->
		<v-card class="pa-6 mb-6" elevation="0" border>
			<v-card-title class="text-body-1 font-weight-bold pa-0 mb-4">
				<v-icon icon="mdi-filter-variant" class="mr-2" color="primary"></v-icon>
				Filtres
			</v-card-title>

			<v-row align="end">
				<v-col cols="12" md="4">
					<label class="text-body-2 font-weight-medium text-medium-emphasis mb-2 d-block"
						>Date de début</label
					>
					<v-text-field
						v-model="filters.from"
						type="date"
						prepend-inner-icon="mdi-calendar-start"
						hide-details
					></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<label class="text-body-2 font-weight-medium text-medium-emphasis mb-2 d-block">Date de fin</label>
					<v-text-field
						v-model="filters.to"
						type="date"
						prepend-inner-icon="mdi-calendar-end"
						hide-details
					></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-btn color="primary" size="large" block @click="fetchStats" :loading="loading">
						<v-icon start icon="mdi-magnify"></v-icon>
						Appliquer
					</v-btn>
				</v-col>
			</v-row>
		</v-card>

		<!-- Charts Section -->
		<v-row class="mb-6" v-if="items.length > 0">
			<v-col cols="12" md="8">
				<v-card class="pa-6" elevation="0" border style="height: 100%">
					<v-card-title class="text-body-1 font-weight-bold pa-0 mb-4">
						<v-icon icon="mdi-chart-bar" class="mr-2" color="primary"></v-icon>
						Distance par code analytique
					</v-card-title>
					<div style="height: 300px">
						<Bar :data="barChartData" :options="barChartOptions" />
					</div>
				</v-card>
			</v-col>
			<v-col cols="12" md="4">
				<v-card class="pa-6" elevation="0" border style="height: 100%">
					<v-card-title class="text-body-1 font-weight-bold pa-0 mb-4">
						<v-icon icon="mdi-chart-pie" class="mr-2" color="primary"></v-icon>
						Répartition
					</v-card-title>
					<div style="height: 300px; display: flex; align-items: center; justify-content: center">
						<Doughnut :data="doughnutChartData" :options="doughnutChartOptions" />
					</div>
				</v-card>
			</v-col>
		</v-row>

		<!-- Data Table Card -->
		<v-card elevation="0" border>
			<v-card-title class="d-flex align-center justify-space-between pa-6 pb-4">
				<div class="d-flex align-center">
					<v-icon icon="mdi-table" class="mr-3" color="primary"></v-icon>
					<span class="text-h6 font-weight-bold">Détail des statistiques</span>
				</div>
				<v-chip color="primary" variant="tonal" size="small">{{ items.length }} résultats</v-chip>
			</v-card-title>

			<v-divider></v-divider>

			<v-data-table :headers="headers" :items="items" :loading="loading" hover class="text-body-1">
				<template v-slot:item.analyticCode="{ item }">
					<v-chip color="primary" variant="flat" size="small" class="font-weight-bold">{{
						item.analyticCode
					}}</v-chip>
				</template>
				<template v-slot:item.totalDistanceKm="{ item }">
					<span class="text-body-1 font-weight-bold"
						>{{ item.totalDistanceKm.toFixed(2) }}
						<span class="text-medium-emphasis font-weight-regular">km</span></span
					>
				</template>
				<template v-slot:no-data>
					<div class="pa-12 text-center">
						<v-icon icon="mdi-chart-line-variant" size="80" color="grey-lighten-2" class="mb-4"></v-icon>
						<p class="text-h6 text-medium-emphasis mb-2">Aucune donnée disponible</p>
						<p class="text-body-2 text-medium-emphasis">Essayez d'ajuster les filtres de date.</p>
					</div>
				</template>
			</v-data-table>
		</v-card>
	</div>
</template>

<script setup lang="ts">
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { computed, onMounted, ref } from "vue";
import { Bar, Doughnut } from "vue-chartjs";
import ApiService from "../services/ApiService";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const loading = ref(false);
const items = ref<any[]>([]);
const filters = ref({
	from: "",
	to: "",
});

const headers = [
	{ title: "Code Analytique", key: "analyticCode", sortable: true },
	{ title: "Distance Totale", key: "totalDistanceKm", sortable: true, align: "end" as const },
];

const chartColors = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#06B6D4", "#84CC16"];

const barChartData = computed(() => ({
	labels: items.value.map((item) => item.analyticCode),
	datasets: [
		{
			label: "Distance (km)",
			data: items.value.map((item) => item.totalDistanceKm),
			backgroundColor: chartColors.slice(0, items.value.length),
			borderRadius: 8,
		},
	],
}));

const barChartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false,
		},
	},
	scales: {
		y: {
			beginAtZero: true,
			grid: {
				color: "rgba(0,0,0,0.05)",
			},
		},
		x: {
			grid: {
				display: false,
			},
		},
	},
};

const doughnutChartData = computed(() => ({
	labels: items.value.map((item) => item.analyticCode),
	datasets: [
		{
			data: items.value.map((item) => item.totalDistanceKm),
			backgroundColor: chartColors.slice(0, items.value.length),
			borderWidth: 0,
		},
	],
}));

const doughnutChartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: "bottom" as const,
		},
	},
};

const fetchStats = async () => {
	loading.value = true;
	try {
		const params: any = {};
		if (filters.value.from) params.from = filters.value.from;
		if (filters.value.to) params.to = filters.value.to;

		const response = await ApiService.getStats(params);
		items.value = response.data.items;
	} catch (err) {
		console.error(err);
	} finally {
		loading.value = false;
	}
};

onMounted(() => {
	fetchStats();
});
</script>
