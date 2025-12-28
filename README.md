# 🌊 Surf Webcams Biarritz

Un site web simple et élégant pour afficher toutes les webcams de surf près de Biarritz en temps réel.

## 📋 Table des matières

- [Présentation](#présentation)
- [Fonctionnalités](#fonctionnalités)
- [Installation locale](#installation-locale)
- [Comment trouver les URLs de webcams](#comment-trouver-les-urls-de-webcams)
- [Ajouter des webcams](#ajouter-des-webcams)
- [Options d'hébergement gratuites](#options-dhébergement-gratuites)
- [Déploiement sur GitHub Pages](#déploiement-sur-github-pages)
- [Structure du projet](#structure-du-projet)
- [Considérations légales](#considérations-légales)
- [Dépannage](#dépannage)

## 🎯 Présentation

Ce projet est un agrégateur de webcams de surf qui affiche plusieurs flux vidéo en direct dans une grille responsive. Le site est construit avec du HTML, CSS et JavaScript pur (sans framework), ce qui le rend facile à comprendre et à modifier.

## ✨ Fonctionnalités

- **Design responsive** : Fonctionne parfaitement sur mobile, tablette et desktop
- **Grille adaptative** : S'adapte automatiquement à la taille de l'écran
- **Gestion d'erreurs** : Affiche des messages d'erreur si un flux ne charge pas
- **Support multiple types de streams** : iframe, vidéo directe, YouTube
- **Interface moderne** : Design épuré et professionnel
- **Facile à maintenir** : Ajoutez de nouvelles webcams en quelques lignes de code

## 🚀 Installation locale

### Prérequis

- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Un éditeur de texte (VS Code, Sublime Text, etc.)
- Git (pour le déploiement)

### Étapes

1. **Cloner ou télécharger le projet**
   ```bash
   git clone <votre-repo-url>
   cd surfcams
   ```

2. **Ouvrir le projet**
   - Ouvrez simplement `index.html` dans votre navigateur
   - Ou utilisez un serveur local :
     ```bash
     # Avec Python 3
     python -m http.server 8000
     
     # Avec Node.js (si vous avez http-server installé)
     npx http-server
     
     # Avec PHP
     php -S localhost:8000
     ```
   - Puis ouvrez `http://localhost:8000` dans votre navigateur

3. **Modifier le code**
   - Ouvrez les fichiers dans votre éditeur préféré
   - Les modifications sont visibles après un rafraîchissement de la page

## 🔍 Comment trouver les URLs de webcams

### Méthode 1 : Inspection du code source (iframe)

1. **Ouvrir la page webcam dans votre navigateur**
   - Par exemple : https://www.anglet-tourisme.com/webcams/

2. **Ouvrir les outils de développement**
   - Appuyez sur `F12` ou `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
   - Ou clic droit → "Inspecter"

3. **Trouver l'iframe**
   - Cliquez sur l'icône de sélection (en haut à gauche des DevTools)
   - Cliquez sur la vidéo webcam sur la page
   - Dans l'onglet "Elements", cherchez une balise `<iframe>`
   - Copiez l'URL dans l'attribut `src`

   Exemple :
   ```html
   <iframe src="https://example.com/webcam/stream"></iframe>
   ```

### Méthode 2 : Onglet Network (pour les flux vidéo directs)

1. **Ouvrir les DevTools** (`F12`)

2. **Aller dans l'onglet "Network"**

3. **Filtrer les requêtes**
   - Tapez "media" ou "video" dans le filtre
   - Ou cherchez des fichiers `.m3u8`, `.mp4`, `.flv`

4. **Recharger la page** (`F5`)

5. **Identifier le flux**
   - Regardez les requêtes qui apparaissent
   - Les flux vidéo ont souvent des noms comme "stream.m3u8" ou "live.mp4"
   - Cliquez sur la requête pour voir l'URL complète

### Méthode 3 : YouTube Live

Si la webcam est diffusée sur YouTube :

1. **Trouver l'URL YouTube**
   - Peut être dans le code source de la page
   - Ou directement sur la chaîne YouTube

2. **Formats d'URL supportés** :
   - `https://www.youtube.com/watch?v=VIDEO_ID`
   - `https://youtu.be/VIDEO_ID`
   - `VIDEO_ID` (juste l'ID)

### Méthode 4 : Vérifier les embed codes

Certains sites fournissent des codes d'intégration :

1. **Chercher un bouton "Partager" ou "Intégrer"**
2. **Copier le code iframe fourni**
3. **Extraire l'URL du src**

### Exemples de sources de webcams près de Biarritz

- **Anglet Tourisme** : https://www.anglet-tourisme.com/webcams/
- **Quiksilver** : https://quiksilver.lu/surf/webcams/
- **Ecole.Surf** : https://ecole.surf/webcams-biarritz/

## ➕ Ajouter des webcams

### Étape 1 : Ouvrir `script.js`

Ouvrez le fichier `script.js` dans votre éditeur.

### Étape 2 : Ajouter une webcam au tableau

Trouvez le tableau `webcams` et ajoutez un nouvel objet :

```javascript
const webcams = [
    {
        id: 1,
        name: "Anglet - La Madrague",
        location: "Anglet",
        streamUrl: "https://example.com/webcam/stream",
        streamType: "iframe", // "iframe", "video", ou "youtube"
        thumbnail: "" // optionnel
    },
    {
        id: 2,
        name: "Biarritz - La Grande Plage",
        location: "Biarritz",
        streamUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
        streamType: "youtube"
    },
    // Ajoutez plus de webcams ici...
];
```

### Paramètres de webcam

- **id** (obligatoire) : Un numéro unique pour chaque webcam
- **name** (obligatoire) : Le nom de la webcam (affiché en titre)
- **location** (obligatoire) : L'emplacement (affiché sous le titre)
- **streamUrl** (obligatoire) : L'URL du flux vidéo
- **streamType** (obligatoire) : Type de stream
  - `"iframe"` : Pour les iframes standard
  - `"video"` : Pour les URLs vidéo directes (.mp4, .m3u8, etc.)
  - `"youtube"` : Pour les streams YouTube (Live ou vidéos)
- **thumbnail** (optionnel) : URL d'une image miniature (non utilisé actuellement)

### Exemples concrets

#### Exemple 1 : iframe standard
```javascript
{
    id: 1,
    name: "Anglet - La Madrague",
    location: "Anglet",
    streamUrl: "https://webcam.example.com/embed/12345",
    streamType: "iframe"
}
```

#### Exemple 2 : Flux vidéo direct
```javascript
{
    id: 2,
    name: "Biarritz - Côte des Basques",
    location: "Biarritz",
    streamUrl: "https://stream.example.com/live/stream.m3u8",
    streamType: "video"
}
```

#### Exemple 3 : YouTube Live
```javascript
{
    id: 3,
    name: "Hendaye - Plage",
    location: "Hendaye",
    streamUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    streamType: "youtube"
}
```

### Étape 3 : Sauvegarder et tester

1. Sauvegardez le fichier `script.js`
2. Rafraîchissez votre navigateur (`F5`)
3. La nouvelle webcam devrait apparaître dans la grille

## 🔄 Maintenir les URLs à jour

Certaines webcams utilisent des URLs avec des timestamps qui peuvent expirer. Voici comment s'assurer que votre site utilise toujours les dernières URLs :

### Mise à jour automatique des timestamps

Le script `script.js` inclut une fonction qui met automatiquement à jour les timestamps dans les URLs au chargement de la page. Cela fonctionne pour les URLs qui contiennent un paramètre `tsp=` (timestamp).

**Cela signifie que :** Les timestamps sont automatiquement mis à jour à chaque chargement de la page, donc vous n'avez généralement pas besoin de vous en préoccuper !

### Si une webcam ne fonctionne plus

Si une webcam ne s'affiche plus (même après rafraîchissement), cela peut signifier que l'UUID a changé. Voici comment trouver la nouvelle URL :

#### Méthode 1 : Utiliser le script helper (Recommandé)

Un script helper est disponible pour extraire les dernières URLs :

```bash
node update-webcams.js
```

Ce script va :
- Vérifier les pages sources des webcams
- Extraire les dernières URLs d'embed
- Vous donner les nouvelles URLs à copier dans `script.js`

#### Méthode 2 : Mise à jour manuelle

1. **Ouvrez la page source de la webcam** (ex: gosurf.fr, quiksilver.fr)
2. **Ouvrez les outils de développement** (`F12`)
3. **Cherchez dans le code source** :
   - Pour les URLs joada.net : Cherchez `platforms5.joada.net`
   - Pour les UUIDs : Cherchez `uuid=` dans le JavaScript
4. **Copiez la nouvelle URL** et mettez à jour `script.js`

#### Exemple : Mettre à jour Hossegor

1. Allez sur `https://gosurf.fr/webcam/fr/21/Hossegor-La-Centrale`
2. Ouvrez les DevTools (`F12`) → onglet "Sources" ou "Elements"
3. Cherchez `joada.net` ou `uuid=`
4. Copiez la nouvelle URL complète
5. Remplacez l'ancienne URL dans `script.js` pour "Hossegor - La Centrale"

### URLs qui ne changent généralement pas

Les webcams suivantes utilisent des URLs stables qui ne changent pas :
- **Toutes les webcams Anglet** (pv.viewsurf.com) - URLs stables
- **Biarritz Grande Plage** (pv.viewsurf.com) - URL stable

### URLs qui peuvent changer

Ces webcams peuvent nécessiter des mises à jour périodiques :
- **Hossegor - La Centrale** (joada.net avec timestamp)
- **Seignosse webcams** (joada.net avec timestamp)
- **Biarritz - Côte des Basques** (UUID peut changer)

**Fréquence recommandée :** Vérifiez une fois par mois ou si une webcam ne fonctionne plus.

## 🌐 Options d'hébergement gratuites

Toutes ces options sont **100% gratuites** pour les sites statiques comme celui-ci :

### Option 1 : Netlify (⭐ Recommandé - Le plus simple)

**Avantages :**
- Déploiement en 2 clics depuis GitHub
- HTTPS automatique
- CDN global rapide
- Domaine personnalisé gratuit (ex: `surfcams.netlify.app`)
- Mises à jour automatiques à chaque push

**Étapes :**

1. **Poussez votre code sur GitHub** (voir section GitHub Pages ci-dessous)

2. **Allez sur [netlify.com](https://www.netlify.com)** et créez un compte gratuit

3. **Cliquez sur "Add new site" → "Import an existing project"**

4. **Connectez votre compte GitHub** et sélectionnez votre dépôt `surfcams`

5. **Configurez le déploiement :**
   - Build command : (laissez vide)
   - Publish directory : `/` (racine)

6. **Cliquez sur "Deploy site"**

7. **Votre site est en ligne !** Vous obtiendrez une URL comme `surfcams-xxxxx.netlify.app`

**Mises à jour automatiques :** Chaque fois que vous faites `git push`, Netlify redéploie automatiquement votre site.

---

### Option 2 : Vercel

**Avantages :**
- Très rapide (CDN global)
- Déploiement automatique depuis GitHub
- Interface moderne

**Étapes :**

1. Allez sur [vercel.com](https://vercel.com) et créez un compte gratuit
2. Cliquez sur "Add New Project"
3. Importez votre dépôt GitHub
4. Laissez les paramètres par défaut (pas de build nécessaire)
5. Cliquez sur "Deploy"

Votre site sera disponible sur `surfcams-xxxxx.vercel.app`

---

### Option 3 : Cloudflare Pages

**Avantages :**
- CDN ultra-rapide (Cloudflare)
- Bandwidth illimité
- Déploiement depuis GitHub

**Étapes :**

1. Allez sur [pages.cloudflare.com](https://pages.cloudflare.com)
2. Créez un compte gratuit
3. Connectez votre compte GitHub
4. Sélectionnez votre dépôt
5. Configurez :
   - Framework preset : None
   - Build command : (laissez vide)
   - Build output directory : `/`
6. Cliquez sur "Save and Deploy"

---

### Option 4 : Surge.sh (Déploiement via ligne de commande)

**Avantages :**
- Très simple
- Pas besoin de compte GitHub public
- Domaine gratuit `.surge.sh`

**Étapes :**

1. **Installez Surge :**
   ```bash
   npm install -g surge
   ```

2. **Dans le dossier de votre projet, déployez :**
   ```bash
   cd "/Users/damien.thioulouse/codebase perso/surfcams"
   surge
   ```

3. **Suivez les instructions :**
   - Créez un compte (gratuit)
   - Choisissez un nom de domaine (ex: `surfcams-biarritz.surge.sh`)
   - C'est tout !

**Pour mettre à jour :** Relancez simplement `surge` dans le dossier.

---

### Comparaison rapide

| Service | Difficulté | Domaine gratuit | Déploiement auto |
|---------|-----------|-----------------|------------------|
| **Netlify** | ⭐ Facile | ✅ Oui | ✅ Oui |
| **Vercel** | ⭐ Facile | ✅ Oui | ✅ Oui |
| **Cloudflare Pages** | ⭐⭐ Moyen | ✅ Oui | ✅ Oui |
| **Surge.sh** | ⭐⭐ Moyen | ✅ Oui | ❌ Non |
| **GitHub Pages** | ⭐⭐ Moyen | ✅ Oui | ✅ Oui |

**Notre recommandation :** Netlify est le plus simple et le plus adapté pour ce projet.

## 📤 Déploiement sur GitHub Pages

**Note :** GitHub Pages est **gratuit** pour les dépôts publics. Si vous préférez une alternative, consultez la section [Options d'hébergement gratuites](#options-dhébergement-gratuites) ci-dessus.

### Étape 1 : Créer un dépôt GitHub

1. Allez sur [GitHub.com](https://github.com)
2. Cliquez sur "New repository"
3. Nommez-le (ex: `surf-webcams-biarritz`)
4. Choisissez "Public" (requis pour GitHub Pages gratuit)
5. **Ne cochez PAS** "Initialize with README" (vous avez déjà un README)
6. Cliquez sur "Create repository"

### Étape 2 : Initialiser Git localement

Ouvrez un terminal dans le dossier du projet :

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Faire le premier commit
git commit -m "Initial commit: Surf webcams aggregator"
```

### Étape 3 : Connecter au dépôt GitHub

```bash
# Remplacer USERNAME et REPO_NAME par vos valeurs
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# Renommer la branche principale en "main" (si nécessaire)
git branch -M main

# Pousser le code
git push -u origin main
```

### Étape 4 : Activer GitHub Pages

1. Allez sur votre dépôt GitHub
2. Cliquez sur "Settings" (en haut à droite)
3. Dans le menu de gauche, cliquez sur "Pages"
4. Sous "Source", sélectionnez "Deploy from a branch"
5. Choisissez la branche `main` et le dossier `/ (root)`
6. Cliquez sur "Save"

### Étape 5 : Accéder à votre site

Votre site sera disponible à :
```
https://USERNAME.github.io/REPO_NAME/
```

**Note** : Il peut falloir quelques minutes pour que le site soit accessible.

### Mettre à jour le site

Chaque fois que vous modifiez le code :

```bash
git add .
git commit -m "Description de vos modifications"
git push
```

Les modifications seront visibles sur GitHub Pages en quelques minutes.

## 📁 Structure du projet

```
surfcams/
├── index.html          # Structure HTML principale
├── styles.css          # Tous les styles CSS
├── script.js           # Logique JavaScript et données des webcams
├── update-webcams.js   # Script helper pour mettre à jour les URLs (optionnel)
├── README.md           # Ce fichier
└── .gitignore          # Fichiers à ignorer par Git
```

## ⚖️ Considérations légales

### Important : Vérifiez les droits d'utilisation

Avant d'intégrer des webcams sur votre site :

1. **Lisez les conditions d'utilisation** du site source
2. **Vérifiez le fichier robots.txt** : `https://example.com/robots.txt`
3. **Contactez les propriétaires** si vous n'êtes pas sûr
4. **Respectez les droits d'auteur** et les marques déposées

### Bonnes pratiques

- **Attribution** : Mentionnez la source des webcams
- **Disclaimer** : Le footer contient déjà un avertissement
- **Respect** : Ne modifiez pas les flux ou ne les redistribuez pas
- **Contact** : En cas de problème, contactez le propriétaire de la webcam

### Si vous recevez une demande de retrait

Si un propriétaire demande de retirer une webcam :

1. Ouvrez `script.js`
2. Supprimez l'entrée de la webcam du tableau `webcams`
3. Commitez et poussez les modifications

## 🔧 Dépannage

### Une webcam ne s'affiche pas

1. **Vérifiez la console du navigateur** (`F12` → onglet "Console")
   - Cherchez les erreurs en rouge
   - Les erreurs CORS sont communes avec les iframes

2. **Vérifiez l'URL**
   - Testez l'URL directement dans votre navigateur
   - Assurez-vous qu'elle fonctionne

3. **Vérifiez le type de stream**
   - `iframe` : Pour les embeds standard
   - `video` : Pour les URLs vidéo directes
   - `youtube` : Pour YouTube

4. **Problèmes CORS**
   - Certains sites bloquent l'intégration dans d'autres sites
   - Vous devrez peut-être contacter le propriétaire

### Le site ne se charge pas sur GitHub Pages

1. **Vérifiez que tous les fichiers sont poussés**
   ```bash
   git status
   ```

2. **Vérifiez les paramètres GitHub Pages**
   - Settings → Pages → Source doit être configuré

3. **Attendez quelques minutes**
   - GitHub Pages peut prendre jusqu'à 10 minutes pour se mettre à jour

4. **Vérifiez l'URL**
   - Assurez-vous d'utiliser la bonne URL : `https://USERNAME.github.io/REPO_NAME/`

### Les webcams ne se chargent pas sur mobile

1. **Vérifiez la connexion internet**
2. **Certains flux peuvent être lourds** - attendez le chargement
3. **Vérifiez que les URLs fonctionnent sur mobile**

### Erreur 403 Forbidden sur les webcams joada.net (en ligne uniquement)

**Symptôme :** Les webcams utilisant `platforms5.joada.net` fonctionnent en local mais affichent "403 Forbidden" quand le site est hébergé en ligne.

**Cause :** Le serveur joada.net vérifie le header HTTP Referer et bloque les requêtes provenant de domaines non autorisés. C'est une protection anti-embed mise en place par le serveur.

**Solutions :**

#### Solution 1 : Activer le proxy CORS (dans script.js)

Ouvrez `script.js` et changez `USE_CORS_PROXY` à `true` :

```javascript
// Ligne ~118 dans script.js
const USE_CORS_PROXY = true; // Changez false en true
```

**Note :** Les proxies CORS peuvent être lents et instables. Testez bien avant de déployer.

#### Solution 2 : Chercher des alternatives pv.viewsurf.com

Les URLs `pv.viewsurf.com` fonctionnent généralement mieux. Vérifiez sur [viewsurf.com](https://viewsurf.com) si des alternatives existent pour vos webcams.

#### Solution 3 : Contacter les propriétaires

Contactez les propriétaires des webcams (viewsurf, gosurf) pour :
- Demander la permission d'embed
- Obtenir des URLs d'embed officielles
- Demander à être ajouté à la liste blanche des domaines autorisés

#### Solution 4 : Utiliser un serveur proxy (Solution avancée)

Si vous avez accès à un serveur backend, créez un proxy qui :
- Récupère les streams depuis joada.net
- Les sert à votre site avec les bons headers
- Contourne les restrictions de referrer

Cela nécessite des connaissances en développement backend (Node.js, Python, etc.).

#### Solution 5 : Héberger sur le même domaine (Non recommandé)

Théoriquement, si vous hébergez votre site sur un sous-domaine autorisé, cela pourrait fonctionner, mais ce n'est généralement pas possible.

### Comment rafraîchir une webcam manuellement

Ouvrez la console du navigateur (`F12`) et tapez :

```javascript
refreshWebcam(1); // Remplacez 1 par l'ID de la webcam
```

Ou rafraîchir toutes les webcams :

```javascript
refreshAllWebcams();
```

## 📝 Notes supplémentaires

- **Performance** : Avoir trop de webcams peut ralentir la page. Limitez à 6-8 webcams pour une meilleure expérience.
- **Mises à jour** : Les URLs de webcams peuvent changer. Vérifiez régulièrement que tout fonctionne.
- **Améliorations futures** : Vous pouvez ajouter des filtres par localisation, des miniatures, ou un système de favoris.

## 🤝 Contribution

N'hésitez pas à améliorer ce projet ! Vous pouvez :
- Ajouter de nouvelles fonctionnalités
- Améliorer le design
- Corriger des bugs
- Ajouter plus de webcams

## 📄 Licence

Ce projet est fourni tel quel, sans garantie. Utilisez-le à vos propres risques.

---

**Bon surf ! 🏄‍♂️**

