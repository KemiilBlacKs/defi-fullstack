<template>
	<v-app class="bg-background">
		<v-app-bar flat color="transparent" class="px-4 mt-2">
			<v-app-bar-title class="font-weight-bold text-h5 text-primary">
				<v-icon icon="mdi-train" class="mr-2"></v-icon>
				Défi Routage
			</v-app-bar-title>
			<v-spacer></v-spacer>
			<v-btn to="/" class="mr-2" :class.active="$route.path === '/' ? 'bg-primary' : ''">Calculateur</v-btn>
			<v-btn to="/stats" :class.active="$route.path === '/stats' ? 'bg-primary' : ''">Statistiques</v-btn>
		</v-app-bar>

		<v-main>
			<v-container fluid class="py-8 px-6">
				<v-fade-transition mode="out-in">
					<router-view></router-view>
				</v-fade-transition>
			</v-container>
		</v-main>
	</v-app>
</template>

<script setup lang="ts">
// Logique du layout si nécessaire
</script>

<style scoped>
@media (min-width: 1280px) {
	.v-container {
		min-width: 1200px;
	}
}
</style>
