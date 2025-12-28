# ✅ Checklist Netlify - Configuration

## Avant le déploiement

### 1. Fichiers nécessaires ✅
- [x] `netlify.toml` - Configuration Netlify
- [x] `netlify/functions/proxy.js` - Fonction proxy
- [x] `package.json` - Dépendances
- [x] `index.html`, `styles.css`, `script.js` - Site web

### 2. Configuration dans `script.js` ⚠️

**À faire APRÈS le déploiement :**

1. **Activez le proxy :**
   ```javascript
   const PROXY_ENABLED = true; // Changez false en true
   ```

2. **Mettez à jour l'URL du proxy :**
   ```javascript
   const PROXY_BASE_URL = 'https://VOTRE-SITE.netlify.app/.netlify/functions/proxy';
   ```
   *(Remplacez `VOTRE-SITE` par votre URL Netlify réelle)*

### 3. Déploiement sur Netlify

1. **Poussez votre code sur GitHub**
2. **Connectez à Netlify :**
   - Allez sur [netlify.com](https://netlify.com)
   - "Add new site" → "Import an existing project"
   - Connectez GitHub et sélectionnez votre dépôt
3. **Configuration :**
   - Build command : (laissez vide)
   - Publish directory : `/` (racine)
4. **Cliquez "Deploy site"**

### 4. Après le déploiement

1. **Notez votre URL Netlify** (ex: `magnificent-beignet-e92358.netlify.app`)
2. **Mettez à jour `script.js` :**
   - `PROXY_ENABLED = true`
   - `PROXY_BASE_URL = 'https://VOTRE-URL.netlify.app/.netlify/functions/proxy'`
3. **Poussez les modifications :**
   ```bash
   git add script.js
   git commit -m "Enable Netlify proxy"
   git push
   ```
4. **Netlify redéploiera automatiquement** (2-3 minutes)

### 5. Test

1. **Testez le proxy directement :**
   ```
   https://VOTRE-SITE.netlify.app/.netlify/functions/proxy?url=https%3A%2F%2Fplatforms5.joada.net%2Fembeded%2Fembeded.html%3Fuuid%3D...
   ```
   Vous devriez voir du HTML, pas une erreur.

2. **Testez votre site :**
   - Les webcams joada.net devraient se charger sans erreur 403

## ✅ C'est tout !

Netlify détecte automatiquement :
- ✅ La fonction dans `netlify/functions/`
- ✅ Les dépendances dans `package.json`
- ✅ La configuration dans `netlify.toml`

**Vous n'avez rien d'autre à configurer !** 🎉

