# 🚆 Défi Routage - Fullstack App

Une application moderne de calcul d'itinéraire ferroviaire et d'analyse de trafic.

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![PHP](https://img.shields.io/badge/PHP-8.2-777BB4.svg)
![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20.svg) ![Vue](https://img.shields.io/badge/Vue.js-3-4FC08D.svg)
![Vuetify](https://img.shields.io/badge/Vuetify-3-1867C0.svg)

## 📋 Fonctionnalités

### Frontend (Vue 3 + Vuetify)

-   **Calculateur d'itinéraire** : Interface intuitive pour rechercher le chemin le plus court.
-   **Visualisation moderne** : Design épuré, responsive et "premium" (Indigo/Emerald).
-   **Tableau de bord** : Statistiques détaillées avec graphiques (Bar & Doughnut).
-   **Persistance** : Sauvegarde locale de l'état (Pinia) pour ne pas perdre ses données lors de la navigation.
-   **Historique** : Mémorisation des 10 derniers codes analytiques saisis.

### Backend (Laravel 11)

-   **API RESTful** : Endpoints performants pour le calcul et les stats.
-   **Algorithme Dijkstra** : Implémentation robuste pour le calcul de chemin optimal.
-   **Documentation API** : Documentation OpenAPI générée automatiquement via Scramble.
-   **Tests** : Suite de tests unitaires et fonctionnels complète.

## 🛠 Prérequis

-   **Docker** & **Docker Compose**
-   Ports disponibles : `8000` (API), `5173` (Frontend), `5432` (PostgreSQL), `8080` (Adminer)

## 🚀 Installation & Démarrage

Le projet utilise un **Makefile** pour simplifier toutes les commandes.

### 1. Initialisation (Première fois)

Cette commande installe les dépendances (Composer/NPM), génère les clés, et lance les migrations.

```bash
make init
```

### 2. Démarrer l'application

Lance les conteneurs en arrière-plan.

```bash
make up
```

L'application sera accessible sur :

-   **Frontend** : http://localhost:3000
-   **Backend API** : http://localhost:8000
-   **Adminer (BDD)** : http://localhost:8080

### 3. Autres commandes utiles

```bash
# Arrêter les conteneurs
make down

# Voir les logs
make logs

# Réinitialiser complètement le projet (Attention: supprime la BDD !)
make reset
```

## ✅ Tests

Le projet dispose d'une suite de tests complète.

```bash
# Lancer tous les tests (Backend + Frontend)
make test

# Lancer uniquement les tests Backend (Pest/PHPUnit)
make test-backend

# Lancer uniquement les tests Frontend (Vitest)
make test-frontend
```

## 📚 Documentation API

Une fois l'application lancée, la documentation OpenAPI est disponible à l'adresse :

👉 **http://localhost:8000/docs/api**

## 🏗 Architecture Technique

### Backend

-   **Framework** : Laravel 11
-   **Base de données** : PostgreSQL 16
-   **Services** :
    -   `NetworkGraph` : Chargement et modélisation du réseau ferré.
    -   `DijkstraPathFinder` : Cœur de l'algorithme de routage.

### Frontend

-   **Framework** : Vue 3 (Composition API)
-   **Build Tool** : Vite
-   **UI Lib** : Vuetify 3
-   **State Management** : Pinia
-   **Charts** : Chart.js / vue-chartjs
-   **Testing** : Vitest

---

_Réalisé pour le Défi Technique Fullstack._
