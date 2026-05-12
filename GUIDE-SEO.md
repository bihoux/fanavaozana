# 🚀 Guide SEO Complet — Portfolio MHR
> Site : https://randriatsarafara-miandrisoa-hoby.vercel.app/  
> Stack : React + Vite + Vercel  
> Mis à jour : Mai 2025

---

## 📁 Fichiers fournis dans ce dossier

| Fichier | Emplacement dans votre projet | Description |
|---|---|---|
| `index.html` | `/index.html` (racine) | HTML principal avec toutes les balises SEO |
| `public/robots.txt` | `/public/robots.txt` | Instructions pour les robots d'indexation |
| `public/sitemap.xml` | `/public/sitemap.xml` | Plan du site pour Google |
| `public/site.webmanifest` | `/public/site.webmanifest` | Manifest PWA |
| `public/googleb8dab59a93c0ae88.html` | `/public/googleb8dab59a93c0ae88.html` | ✅ Fichier de vérification Google Search Console |
| `vite.config.js` | `/vite.config.js` | Config Vite optimisée (build, performance) |
| `vercel.json` | `/vercel.json` (racine) | Config Vercel (headers, cache, redirects) |
| `src/hooks/useSEO.js` | `/src/hooks/useSEO.js` | Hook React pour SEO dynamique |

---

## 🔧 ÉTAPE 1 — Copier les fichiers dans votre projet

```bash
# Depuis la racine de votre projet
cp index.html ./index.html
cp vite.config.js ./vite.config.js
cp vercel.json ./vercel.json
cp public/robots.txt ./public/robots.txt
cp public/sitemap.xml ./public/sitemap.xml
cp public/site.webmanifest ./public/site.webmanifest
cp public/googleb8dab59a93c0ae88.html ./public/googleb8dab59a93c0ae88.html
mkdir -p src/hooks
cp src/hooks/useSEO.js ./src/hooks/useSEO.js
```

---

## 🏗️ ÉTAPE 2 — Structure des titres H1/H2 dans votre Portfolio.jsx

Votre composant principal doit respecter cette hiérarchie :

```jsx
// Portfolio.jsx (ou App.jsx)
export default function Portfolio() {
  // SEO dynamique via le hook (optionnel sur page unique)
  // useSEO({ title: 'Développeur Full Stack', description: '...' })

  return (
    <main>
      {/* ✅ UN SEUL H1 par page */}
      <h1>Randriatsarafara Miandrisoa Hoby</h1>
      <p>Développeur Full Stack</p>

      {/* ✅ Sections avec H2 */}
      <section id="a-propos" aria-labelledby="titre-apropos">
        <h2 id="titre-apropos">À propos</h2>
        <p>Description de vous...</p>
      </section>

      <section id="competences" aria-labelledby="titre-competences">
        <h2 id="titre-competences">Compétences</h2>
        {/* H3 pour les sous-catégories */}
        <h3>Front-end</h3>
        <h3>Back-end</h3>
      </section>

      <section id="projets" aria-labelledby="titre-projets">
        <h2 id="titre-projets">Projets</h2>
        {/* Chaque projet avec un H3 */}
        <article>
          <h3>Nom du Projet</h3>
          {/* Image avec ALT obligatoire */}
          <img
            src="/projets/monprojet.webp"
            alt="Capture d'écran de MonProjet – application de gestion"
            width="800"
            height="450"
            loading="lazy"
          />
        </article>
      </section>

      <section id="contact" aria-labelledby="titre-contact">
        <h2 id="titre-contact">Contact</h2>
      </section>
    </main>
  )
}
```

---

## 🖼️ ÉTAPE 3 — Optimisation des images

### Convertir vos images en WebP

```bash
# Installer cwebp (une seule fois)
sudo apt install webp   # Linux
brew install webp       # Mac

# Convertir une image
cwebp -q 80 image.jpg -o image.webp

# Convertir toutes les images JPG/PNG
for f in public/images/*.{jpg,png}; do
  cwebp -q 80 "$f" -o "${f%.*}.webp"
done
```

### Dans votre JSX — toujours utiliser `<picture>` pour le fallback

```jsx
// Composant Image optimisé
function OptimizedImage({ src, alt, width, height, priority = false }) {
  return (
    <picture>
      <source srcSet={src.replace(/\.(jpg|png)$/, '.webp')} type="image/webp" />
      <img
        src={src}
        alt={alt}            // ← TOUJOURS renseigné
        width={width}        // ← TOUJOURS défini (évite CLS)
        height={height}      // ← TOUJOURS défini
        loading={priority ? 'eager' : 'lazy'}   // eager pour les images above-the-fold
        decoding="async"
      />
    </picture>
  )
}

// Usage
<OptimizedImage
  src="/images/profil.jpg"
  alt="Photo de profil de Miandrisoa Hoby"
  width={400}
  height={400}
  priority={true}  // ← Image principale : charger en priorité
/>
```

### Créer l'image OG (1200×630px)

Créez `/public/og-image.png` de 1200×630px avec :
- Votre nom et titre
- Un fond aux couleurs de votre site
- Taille max recommandée : 300KB

---

## 📊 ÉTAPE 4 — Google Search Console (GSC)

### 4.1 — Ajouter la propriété

1. Allez sur https://search.google.com/search-console/
2. Cliquez **"Ajouter une propriété"**
3. Choisissez **"Préfixe d'URL"** (plus simple pour Vercel)
4. Saisissez : `https://randriatsarafara-miandrisoa-hoby.vercel.app/`

### 4.2 — Vérifier la propriété (3 méthodes, choisir 1)

#### ✅ Méthode 1 — Fichier HTML (RECOMMANDÉ — déjà fait !)
Le fichier `public/googleb8dab59a93c0ae88.html` est prêt.

```
1. Copiez-le dans votre /public/
2. Déployez sur Vercel (git push)
3. Vérifiez que https://randriatsarafara-miandrisoa-hoby.vercel.app/googleb8dab59a93c0ae88.html
   est accessible et affiche bien : "google-site-verification: googleb8dab59a93c0ae88.html"
4. Dans GSC → cliquez "Vérifier"
```

#### Méthode 2 — Balise meta (déjà dans index.html)
La balise suivante est déjà ajoutée dans `index.html` :
```html
<meta name="google-site-verification" content="b8dab59a93c0ae88" />
```
→ Déployez et cliquez "Vérifier" dans GSC.

#### Méthode 3 — DNS TXT (si vous avez un domaine custom)
```
Nom d'hôte : @
Type : TXT
Valeur : google-site-verification=b8dab59a93c0ae88
```

### 4.3 — Soumettre le sitemap

Après vérification :
1. Dans GSC → **Sitemaps** (menu gauche)
2. Collez : `sitemap.xml`
3. Cliquez **"Envoyer"**
4. Statut attendu : ✅ "Succès" (peut prendre quelques minutes)

### 4.4 — Demander l'indexation des pages principales

1. Dans GSC → barre de recherche en haut → collez votre URL
2. Cliquez **"Demander l'indexation"**
3. Répétez pour chaque URL importante

---

## ⚡ ÉTAPE 5 — Performance (Core Web Vitals)

### Vérifier les scores

```bash
# Lighthouse en ligne de commande
npm install -g lighthouse
lighthouse https://randriatsarafara-miandrisoa-hoby.vercel.app/ --view

# Ou via Chrome DevTools → Lighthouse → Analyser
```

### Objectifs Core Web Vitals

| Métrique | Objectif | Description |
|---|---|---|
| **LCP** | < 2.5s | Largest Contentful Paint – vitesse d'affichage |
| **FID/INP** | < 100ms | Interactivité |
| **CLS** | < 0.1 | Cumulative Layout Shift – stabilité visuelle |
| **FCP** | < 1.8s | First Contentful Paint |

### Conseils pour améliorer

```jsx
// 1. Lazy loading des composants non-critiques
import { lazy, Suspense } from 'react'
const ProjectsSection = lazy(() => import('./components/ProjectsSection'))
const ContactSection = lazy(() => import('./components/ContactSection'))

function App() {
  return (
    <Suspense fallback={<div aria-label="Chargement...">...</div>}>
      <ProjectsSection />
      <ContactSection />
    </Suspense>
  )
}

// 2. Éviter les re-renders inutiles
import { memo } from 'react'
const ProjectCard = memo(function ProjectCard({ title, description }) {
  return (...)
})
```

---

## ♿ ÉTAPE 6 — Accessibilité (impacte le SEO)

```jsx
// ✅ Bonnes pratiques accessibilité dans votre JSX

// Navigation avec landmark aria
<header role="banner">...</header>
<nav aria-label="Navigation principale">...</nav>
<main id="contenu-principal">...</main>
<footer role="contentinfo">...</footer>

// Liens avec texte descriptif (pas "Cliquez ici")
<a href="/projets" aria-label="Voir tous mes projets">Voir les projets →</a>

// Boutons avec label
<button aria-label="Fermer le menu de navigation">✕</button>

// Skip link pour l'accessibilité clavier (à mettre en premier dans body)
<a href="#contenu-principal" className="skip-link">
  Aller au contenu principal
</a>
```

```css
/* CSS pour le skip link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #0f172a;
  color: white;
  padding: 8px;
  z-index: 100;
}
.skip-link:focus {
  top: 0;
}
```

---

## 📱 ÉTAPE 7 — Responsive Design

```css
/* Vérifier dans vos CSS globaux */

/* Mobile first */
* {
  box-sizing: border-box;
}

body {
  /* Empêche le scroll horizontal sur mobile */
  overflow-x: hidden;
}

img, video {
  /* Images fluides = évite le CLS */
  max-width: 100%;
  height: auto;
}

/* Taille de police minimale sur mobile */
@media (max-width: 640px) {
  html {
    font-size: 16px; /* Jamais en dessous de 16px pour la lisibilité mobile */
  }
}
```

---

## ✅ Checklist finale avant mise en ligne

### Technique
- [ ] `index.html` mis à jour avec toutes les balises meta
- [ ] `public/googleb8dab59a93c0ae88.html` copié dans `/public/`
- [ ] `public/robots.txt` en place
- [ ] `public/sitemap.xml` en place  
- [ ] `public/site.webmanifest` en place
- [ ] `vercel.json` à la racine du projet
- [ ] `vite.config.js` mis à jour

### Images
- [ ] `/public/og-image.png` créée (1200×630px)
- [ ] `/public/favicon.svg` présent
- [ ] Toutes les images `<img>` ont un attribut `alt`
- [ ] Images converties en `.webp` quand possible

### Contenu
- [ ] Un seul `<h1>` par page
- [ ] Hiérarchie H1→H2→H3 respectée
- [ ] Textes des liens descriptifs (pas "cliquez ici")

### Google Search Console
- [ ] Propriété ajoutée dans GSC
- [ ] Vérification effectuée (fichier HTML ou meta tag)
- [ ] Sitemap soumis et accepté
- [ ] Indexation demandée pour la page principale

### Performance
- [ ] Score Lighthouse ≥ 90 (Performance, SEO, Accessibility)
- [ ] LCP < 2.5s
- [ ] CLS < 0.1

---

## 🔗 Ressources utiles

- [Google Search Console](https://search.google.com/search-console/)
- [PageSpeed Insights](https://pagespeed.web.dev/) — tester votre score
- [Schema.org](https://schema.org/Person) — données structurées
- [Open Graph Debugger (Facebook)](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Squoosh](https://squoosh.app/) — compresser les images en ligne
