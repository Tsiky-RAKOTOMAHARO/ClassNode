# ClassNode

Application web de gestion d'étudiants (CRUD + statistiques) avec authentification simple.

## Stack technique

- **Backend** : NestJS (TypeScript) + MySQL (via `mysql2`)
- **Frontend** : Vue 3 + Vite + Pinia + Axios
- **Base de données** : MySQL 8 (via Docker Compose)

## Prérequis

- Node.js `^22.18.0` ou `>=24.12.0`
- Docker et Docker Compose
- npm

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/Tsiky-RAKOTOMAHARO/ClassNode.git
cd ClassNode
```

### 2. Configurer les variables d'environnement

Copier le fichier d'exemple et renseigner les valeurs :

```bash
cp .env.example .env
```

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=ton_mot_de_passe
DB_NAME=gestion_etudiant
DB_ROOT_PASSWORD=ton_mot_de_passe_root
```

### 3. Lancer la base de données (Docker)

```bash
docker compose up -d
```

Cela démarre une instance MySQL et exécute automatiquement le script `docker/mysql/init.sql` (création des tables `ETUDIANT` et `USER`).

### 4. Lancer le backend

```bash
cd backend
npm install
npm run start:dev
```

Le backend démarre par défaut sur `http://localhost:3000`.

### 5. Lancer le frontend

Dans un autre terminal :

```bash
cd frontend
npm install
npm run dev
```

Le frontend démarre par défaut sur `http://localhost:5173`.

## Utilisation

Ouvrir `http://localhost:5173` dans le navigateur, se connecter avec un compte présent dans la table `USER`, puis gérer la liste des étudiants (création, modification, suppression, consultation des statistiques).



## Structure du projet

```
ClassNode/
├── backend/        # API NestJS
├── frontend/        # Interface Vue 3
├── docker/mysql/     # Script d'initialisation SQL
└── docker-compose.yml
```