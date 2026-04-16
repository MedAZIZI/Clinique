# 🏥 Clinique26 - Frontend Vue.js

Application frontend de gestion de clinique médicale développée avec Vue.js 3 et Vite.

## 🚀 Déploiement sur GitHub Pages

### Configuration automatique
Le projet est configuré pour un déploiement automatique sur GitHub Pages via GitHub Actions.

### Activation de GitHub Pages
1. Allez sur votre repository GitHub : https://github.com/MedAZIZI/Clinique
2. Cliquez sur **Settings** (Paramètres)
3. Dans la section **Pages**, sélectionnez :
   - **Source** : `GitHub Actions`
4. Le déploiement se déclenchera automatiquement à chaque push sur la branche `main`

### URL du site déployé
Une fois déployé, votre application sera accessible à l'adresse :
```
https://medazizi.github.io/Clinique/
```

## 🛠️ Développement local

### Prérequis
- Node.js (version 18 ou supérieure)
- npm

### Installation
```bash
npm install
```

### Développement
```bash
npm run dev
```

### Build de production
```bash
npm run build
```

### Prévisualisation du build
```bash
npm run preview
```

## 📁 Structure du projet

```
src/
├── components/     # Composants réutilisables
├── layouts/        # Layouts de l'application
├── router/         # Configuration du routage
├── views/          # Pages de l'application
│   ├── patients/   # Gestion des patients
│   ├── hospitalization/  # Gestion des hospitalisations
│   └── Dashboard.vue     # Tableau de bord multi-rôles
├── App.vue         # Composant racine
└── main.js         # Point d'entrée
```

## ✨ Fonctionnalités

- **Dashboard multi-rôles** : Admin, Médecin, Secrétaire, Comptable
- **Gestion des patients** : CRUD complet avec dossiers médicaux détaillés
- **Gestion des hospitalisations** : Suivi des séjours et interventions
- **Interface responsive** : Optimisée pour desktop et mobile
- **Routing Vue Router** : Navigation fluide entre les pages

## 🎨 Technologies utilisées

- **Vue.js 3** - Framework JavaScript progressif
- **Vite** - Outil de build rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **Headless UI** - Composants UI accessibles
- **Heroicons** - Icônes SVG
- **Vue Router** - Routage officiel pour Vue.js

## 📄 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run preview` - Prévisualise le build de production localement
- `npm run deploy` - Déploie manuellement sur GitHub Pages (via gh-pages)

## 🔧 Configuration

La configuration Vite est optimisée pour GitHub Pages avec le paramètre `base: '/Clinique/'` dans `vite.config.js`.

## 📝 Notes importantes

- Le projet utilise des données mockées pour la démonstration
- L'application est prête pour l'intégration d'une API backend
- Le déploiement automatique se déclenche uniquement sur la branche `main`
