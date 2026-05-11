# Portfolio — Miandrisoa Hoby RANDRIATSARAFARA
> AI Engineer & PhD Researcher · Full Stack Developer · Computer Vision

## 🚀 Démarrage rapide

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # génère dist/
```

## 🌐 Déployer sur Netlify

### Option 1 — Glisser-déposer
```bash
npm run build
# Glisser le dossier dist/ sur app.netlify.com/drop
```

### Option 2 — GitHub
1. Push ce repo sur GitHub
2. Connecter sur Netlify → New site from Git
3. Build command: `npm run build`
4. Publish directory: `dist`

Le fichier `netlify.toml` est déjà configuré.

## 📁 Structure
```
portfolio/
├── index.html        # Point d'entrée
├── main.jsx          # Racine React
├── Portfolio.jsx     # ← TOUT le code (1 fichier)
├── vite.config.js
├── netlify.toml      # Config déploiement
├── package.json
└── README.md
```

## ✨ Fonctionnalités
- 🌓 Mode sombre / clair
- 🇫🇷🇬🇧 FR / EN bilingue
- 📜 Défilement fluide
- 📌 Navbar sticky frosted-glass
- ✨ Animations au scroll
- 📱 100% responsive
- 🎨 Design system "Neural Noir"

## 🎨 Palette de couleurs
| Rôle     | Sombre    | Clair     |
|----------|-----------|-----------|
| Fond     | `#050B18` | `#F0F4FF` |
| Surface  | `#0D1526` | `#FFFFFF` |
| Accent   | `#00C8FF` | `#0284C7` |
| Texte    | `#E2E8F0` | `#0F172A` |
| Muet     | `#64748B` | `#94A3B8` |

## 📝 Modifier le contenu
Tout est dans `Portfolio.jsx` :
- `C` → textes FR/EN
- `SKILL_GROUPS` → compétences avec pourcentages
- `PROJECTS` → projets
- `EXPERIENCES` → timeline professionnelle
- `TEACHING` → enseignements (accordéon)
- `EDUCATION` → diplômes
- `PUBLICATIONS` → articles
- `CERTS` → certifications

---
Built with React 18 + Vite + CSS-in-JS
