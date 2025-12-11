.PHONY: help up down build start stop logs init test test-backend migrate shell-backend

# Couleurs
BLUE := \033[0;34m
GREEN := \033[0;32m
CYAN := \033[0;36m
RED := \033[0;31m
NC := \033[0m

help:
	@echo "Makefile pour le projet Défi Routage"
	@echo "Utilisation :"
	@echo "  make up             Démarrer l'application (en arrière-plan)"
	@echo "  make down           Arrêter l'application"
	@echo "  make build          Construire les conteneurs Docker"
	@echo "  make logs           Suivre les logs de l'application"
	@echo "  make init           Initialiser le projet (install deps, migrations)"
	@echo "  make test           Lancer tous les tests"
	@echo "  make test-backend   Lancer les tests backend (Pest/PHPUnit)"
	@echo "  make test-frontend  Lancer les tests frontend (Vitest)"
	@echo "  make migrate        Lancer les migrations de base de données"
	@echo "  make shell-backend  Ouvrir un shell dans le conteneur backend"
	@echo "  make reset          Réinitialiser le projet (nettoie la BDD et ré-initialise)"

up:
	@echo ""
	@echo "${GREEN}╔══════════════════════════════════════════════════╗${NC}"
	@echo "${GREEN}║          DÉMARRAGE DE L'APPLICATION              ║${NC}"
	@echo "${GREEN}╚══════════════════════════════════════════════════╝${NC}"
	@echo ""
	docker compose up -d
	@echo ""
	@echo "${GREEN}🚀 Application accessible sur http://localhost:3000${NC}"
	@echo ""

down:
	@echo ""
	@echo "${RED}╔══════════════════════════════════════════════════╗${NC}"
	@echo "${RED}║             ARRÊT DE L'APPLICATION               ║${NC}"
	@echo "${RED}╚══════════════════════════════════════════════════╝${NC}"
	@echo ""
	docker compose down

build:
	@echo ""
	@echo "${CYAN}╔══════════════════════════════════════════════════╗${NC}"
	@echo "${CYAN}║         CONSTRUCTION DES CONTENEURS              ║${NC}"
	@echo "${CYAN}╚══════════════════════════════════════════════════╝${NC}"
	@echo ""
	docker compose build

start: up

stop: down

logs:
	@echo ""
	@echo "${BLUE}╔══════════════════════════════════════════════════╗${NC}"
	@echo "${BLUE}║          LECTURE DES LOGS EN DIRECT              ║${NC}"
	@echo "${BLUE}╚══════════════════════════════════════════════════╝${NC}"
	@echo "${BLUE}(Ctrl+C pour quitter)${NC}"
	@echo ""
	docker compose logs -f

init:
	@echo ""
	@echo "${BLUE}╔══════════════════════════════════════════════════╗${NC}"
	@echo "${BLUE}║          INITIALISATION DU BACKEND               ║${NC}"
	@echo "${BLUE}╚══════════════════════════════════════════════════╝${NC}"
	@echo ""
	docker compose run --rm backend composer install
	docker compose run --rm backend php artisan key:generate
	docker compose run --rm backend php artisan migrate --force
	@echo ""
	@echo "${CYAN}╔══════════════════════════════════════════════════╗${NC}"
	@echo "${CYAN}║          INITIALISATION DU FRONTEND              ║${NC}"
	@echo "${CYAN}╚══════════════════════════════════════════════════╝${NC}"
	@echo ""
	docker compose run --rm frontend npm install
	docker compose run --rm frontend npm run build
	@echo ""
	@echo "${GREEN}╔══════════════════════════════════════════════════╗${NC}"
	@echo "${GREEN}║           INITIALISATION TERMINÉE !              ║${NC}"
	@echo "${GREEN}╚══════════════════════════════════════════════════╝${NC}"
	@echo "${GREEN}➜ Vous pouvez maintenant lancer : make up${NC}"
	@echo ""

test: test-backend test-frontend

test-backend:
	@echo ""
	@echo "${CYAN}╔══════════════════════════════════════════════════╗${NC}"
	@echo "${CYAN}║             TESTS BACKEND (PEST)                 ║${NC}"
	@echo "${CYAN}╚══════════════════════════════════════════════════╝${NC}"
	@echo ""
	docker compose run --rm backend php artisan test

test-frontend:
	@echo ""
	@echo "${CYAN}╔══════════════════════════════════════════════════╗${NC}"
	@echo "${CYAN}║             TESTS FRONTEND (VITEST)              ║${NC}"
	@echo "${CYAN}╚══════════════════════════════════════════════════╝${NC}"
	@echo ""
	docker compose run --rm frontend npm run test

migrate:
	@echo ""
	@echo "${BLUE}╔══════════════════════════════════════════════════╗${NC}"
	@echo "${BLUE}║          MIGRATION BASE DE DONNÉES               ║${NC}"
	@echo "${BLUE}╚══════════════════════════════════════════════════╝${NC}"
	@echo ""
	docker compose run --rm backend php artisan migrate --force
	
shell-backend:
	@echo ""
	@echo "${BLUE}╔══════════════════════════════════════════════════╗${NC}"
	@echo "${BLUE}║             SHELL BACKEND (LARAVEL)              ║${NC}"
	@echo "${BLUE}╚══════════════════════════════════════════════════╝${NC}"
	@echo ""
	docker compose exec backend sh

reset:
	@echo ""
	@echo "${RED}╔══════════════════════════════════════════════════╗${NC}"
	@echo "${RED}║      RÉINITIALISATION COMPLÈTE DU PROJET         ║${NC}"
	@echo "${RED}╚══════════════════════════════════════════════════╝${NC}"
	@echo "${RED}⚠️  Attention : Suppression des conteneurs et volumes...${NC}"
	@echo ""
	docker compose down -v --remove-orphans
	$(MAKE) init
