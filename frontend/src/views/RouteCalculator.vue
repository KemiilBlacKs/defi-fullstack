<template>
	<div>
		<!-- Hero Section -->
		<div class="text-center py-12 mb-8">
			<v-icon icon="mdi-train" size="64" color="primary" class="mb-4"></v-icon>
			<h1 class="text-h2 font-weight-bold mb-4">Planifiez votre trajet</h1>
			<p class="text-body-1 text-medium-emphasis mx-auto" style="max-width: 600px">
				Calculez l'itinéraire le plus rapide entre deux stations ferroviaires et suivez vos trajets avec des
				codes analytiques.
			</p>
		</div>

		<!-- Form Card -->
		<v-card class="pa-8 mb-8" elevation="0" border>
			<div class="d-flex align-center justify-space-between mb-6">
				<v-card-title class="text-h5 font-weight-bold pa-0">
					<v-icon icon="mdi-map-search" class="mr-3" color="primary"></v-icon>
					Nouveau calcul
				</v-card-title>
				<v-btn
					variant="outlined"
					color="grey"
					prepend-icon="mdi-refresh"
					@click="resetForm"
					:disabled="!hasData"
				>
					Réinitialiser
				</v-btn>
			</div>

			<v-form @submit.prevent="calculate">
				<v-row>
					<v-col cols="12" md="6">
						<label class="text-body-2 font-weight-medium text-medium-emphasis mb-2 d-block"
							>Station de départ</label
						>
						<v-autocomplete
							v-model="store.fromStation"
							:items="stations"
							item-title="longName"
							item-value="shortName"
							prepend-inner-icon="mdi-map-marker-outline"
							placeholder="Sélectionnez une station..."
							:rules="[(v: any) => !!v || 'Requis']"
							hide-details="auto"
						></v-autocomplete>
					</v-col>
					<v-col cols="12" md="6">
						<label class="text-body-2 font-weight-medium text-medium-emphasis mb-2 d-block"
							>Station d'arrivée</label
						>
						<v-autocomplete
							v-model="store.toStation"
							:items="stations"
							item-title="longName"
							item-value="shortName"
							prepend-inner-icon="mdi-flag-checkered"
							placeholder="Sélectionnez une station..."
							:rules="[(v: any) => !!v || 'Requis']"
							hide-details="auto"
						></v-autocomplete>
					</v-col>
				</v-row>

				<v-row class="mt-4">
					<v-col cols="12" md="8">
						<label class="text-body-2 font-weight-medium text-medium-emphasis mb-2 d-block"
							>Code Analytique</label
						>
						<v-combobox
							v-model="store.analyticCode"
							:items="store.analyticCodeHistory"
							prepend-inner-icon="mdi-tag-outline"
							placeholder="Ex: PROJET-2024, MAINTENANCE, etc."
							:rules="[(v: any) => !!v || 'Requis']"
							hide-details="auto"
							clearable
						></v-combobox>
					</v-col>
					<v-col cols="12" md="4" class="d-flex align-end">
						<v-btn
							type="submit"
							color="primary"
							size="x-large"
							:loading="loading"
							block
							class="text-none text-body-1 font-weight-bold"
						>
							<v-icon start icon="mdi-calculator"></v-icon>
							Calculer
						</v-btn>
					</v-col>
				</v-row>
			</v-form>

			<v-expand-transition>
				<v-alert v-if="store.error" type="error" variant="tonal" class="mt-6" closable>
					{{ store.error }}
				</v-alert>
			</v-expand-transition>
		</v-card>

		<!-- Result Section -->
		<v-expand-transition>
			<div v-if="store.result">
				<v-card class="pa-8" elevation="0" border>
					<div class="d-flex flex-wrap justify-space-between align-center mb-8 ga-4">
						<div>
							<p class="text-body-2 text-medium-emphasis text-uppercase font-weight-bold mb-1">
								Distance Totale
							</p>
							<p class="text-h2 font-weight-bold text-primary mb-0">
								{{ store.result.distance_km.toFixed(2) }}
								<span class="text-h5 text-medium-emphasis">km</span>
							</p>
						</div>
						<v-chip color="success" variant="flat" size="large" class="px-4">
							<v-icon start icon="mdi-check-circle"></v-icon>
							Itinéraire optimisé
						</v-chip>
					</div>

					<v-divider class="mb-6"></v-divider>

					<p class="text-body-2 text-medium-emphasis text-uppercase font-weight-bold mb-4">
						Détail du trajet
					</p>

					<v-timeline density="compact" align="start" side="end">
						<v-timeline-item
							v-for="(stop, index) in store.result.path"
							:key="index"
							:dot-color="
								index === 0 || index === store.result.path.length - 1 ? 'primary' : 'grey-lighten-2'
							"
							:size="index === 0 || index === store.result.path.length - 1 ? 'default' : 'small'"
							fill-dot
						>
							<div class="d-flex align-center py-2">
								<span class="text-body-1 font-weight-medium mr-3">{{ getStationName(stop) }}</span>
								<v-chip size="small" variant="outlined" color="grey">{{ stop }}</v-chip>
							</div>
						</v-timeline-item>
					</v-timeline>
				</v-card>
			</div>
		</v-expand-transition>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import stationsData from "../assets/stations.json";
import ApiService from "../services/ApiService";
import { useRouteCalculatorStore } from "../stores/routeCalculator";

const store = useRouteCalculatorStore();
const stations = ref(stationsData);
const loading = ref(false);

const hasData = computed(() => {
	return store.fromStation || store.toStation || store.analyticCode || store.result;
});

const resetForm = () => {
	store.reset();
};

const calculate = async () => {
	if (!store.fromStation || !store.toStation || !store.analyticCode) return;

	loading.value = true;
	store.error = "";

	try {
		const response = await ApiService.createRoute({
			fromStationId: store.fromStation,
			toStationId: store.toStation,
			analyticCode: store.analyticCode,
		});
		store.setResult(response.data);
		store.addToHistory(store.analyticCode);
	} catch (err: any) {
		console.error(err);
		store.setError(err.response?.data?.message || "Erreur lors du calcul");
	} finally {
		loading.value = false;
	}
};

const getStationName = (shortName: string) => {
	const s = stations.value.find((s: any) => s.shortName === shortName);
	return s ? s.longName : shortName;
};
</script>
