# 🏆 Tournoi Direct

**Tournoi Direct** est une application web permettant d'organiser facilement des tournois sportifs (championnats ou coupes), de générer automatiquement les rencontres, de gérer les scores et d'afficher un classement dynamique en temps réel.

Développée en React avec Vite, l'application est 100 % frontend et fonctionne entièrement depuis le navigateur grâce au `localStorage`.

---

## 🔗 Lien pour accéder à l'application 

👉 [tournoi-direct.remi-dev.fr](https://tournoi-direct.remi-dev.fr)

---

## 🎯 Fonctionnalités

- ⚙️ Configuration du tournoi (nombre d’équipes, points, aller-retour, matchs simultanés…)
- 🧠 Génération des rencontres via l’algorithme Round Robin
- 📝 Saisie des scores match par match
- 🧮 Calcul automatique des points, matchs joués, buts, victoires, défaites, nuls
- 📊 Tableau de classement dynamique
- 🧱 Stockage local (localStorage) pour persistance sans backend
- 📱 Expérience mobile fluide (scroll auto, clavier, responsive)

---

## 📌 Technologies utilisées

- ⚛️ React + Vite
- 🧼 DOMPurify (assainissement des entrées utilisateur)
- ♻️ React Infinite Scroll Component
- 📁 LocalStorage (sans base de données)
- 🎨 CSS Modules

---

## 🧠 Algorithme utilisé

L’organisation des matchs s’appuie sur l’algorithme **Round Robin**, qui garantit que chaque équipe affronte toutes les autres une seule fois (ou deux en cas d'aller-retour). Il prend en compte les cas d'équipes impaires (ajout automatique d’un "bye").

---

## 🧩 Installation locale

```bash
git clone https://github.com/ton-utilisateur/tournoi-direct.git
cd tournoi-direct
npm install
npm run dev
