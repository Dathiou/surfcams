# Configuration du Proxy Backend

Ce guide vous explique comment configurer le proxy backend pour résoudre les erreurs 403 Forbidden sur les webcams joada.net.

## Configuration rapide

### Pour Netlify

1. **Déployez votre site sur Netlify** (connectez votre dépôt GitHub)

2. **Ouvrez `script.js` et modifiez :**
   ```javascript
   const PROXY_ENABLED = true;
   const PROXY_BASE_URL = 'https://votre-site.netlify.app/.netlify/functions/proxy';
   ```
   *(Remplacez `votre-site.netlify.app` par votre URL Netlify réelle)*

3. **Poussez les modifications :**
   ```bash
   git add script.js
   git commit -m "Enable proxy for joada.net webcams"
   git push
   ```

4. **C'est tout !** Netlify déploiera automatiquement la fonction proxy.

### Pour Vercel

1. **Déployez votre site sur Vercel** (connectez votre dépôt GitHub)

2. **Ouvrez `script.js` et modifiez :**
   ```javascript
   const PROXY_ENABLED = true;
   const PROXY_BASE_URL = 'https://votre-site.vercel.app/api/proxy';
   ```
   *(Remplacez `votre-site.vercel.app` par votre URL Vercel réelle)*

3. **Poussez les modifications :**
   ```bash
   git add script.js
   git commit -m "Enable proxy for joada.net webcams"
   git push
   ```

4. **C'est tout !** Vercel déploiera automatiquement la fonction proxy.

### Pour développement local

1. **Installez les dépendances :**
   ```bash
   npm install
   ```

2. **Démarrez le serveur :**
   ```bash
   npm start
   ```

3. **Ouvrez `script.js` et modifiez :**
   ```javascript
   const PROXY_ENABLED = true;
   const PROXY_BASE_URL = 'http://localhost:3000/api/proxy';
   ```

4. **Ouvrez votre navigateur :**
   ```
   http://localhost:3000
   ```

## Vérification

Pour vérifier que le proxy fonctionne :

1. **Ouvrez la console du navigateur** (F12)
2. **Regardez les requêtes réseau** (onglet Network)
3. **Vous devriez voir des requêtes vers `/api/proxy` ou `/.netlify/functions/proxy`**
4. **Les webcams joada.net devraient se charger sans erreur 403**

## Dépannage

### Le proxy ne fonctionne pas

1. **Vérifiez que `PROXY_ENABLED` est à `true`**
2. **Vérifiez que `PROXY_BASE_URL` est correct** (avec `https://` et sans slash final)
3. **Testez l'URL du proxy directement :**
   ```
   https://votre-site.netlify.app/.netlify/functions/proxy?url=https%3A%2F%2Fplatforms5.joada.net%2Fembeded%2Fembeded.html%3Fuuid%3D...
   ```
   Vous devriez voir du HTML, pas une erreur.

### Erreur CORS

Si vous voyez des erreurs CORS dans la console :
- Vérifiez que le proxy renvoie les bons headers
- Vérifiez que l'URL du proxy est correcte

### Erreur 500 sur le proxy

- Vérifiez les logs de votre plateforme (Netlify/Vercel dashboard)
- Assurez-vous que `npm install` a été exécuté
- Vérifiez que l'URL joada.net est valide

## Webcams affectées

Les webcams suivantes utilisent joada.net et nécessitent le proxy :
- Hossegor - La Centrale
- Seignosse - Plage du Penon
- Seignosse - Plage des Estagnots
- Seignosse - Plage des Bourdaines
- Seignosse - Plage du Penon (Live)
- Seignosse - Général
- Saint Jean de Luz - Sainte Barbe
- Biarritz - Côte des Basques

Les autres webcams (pv.viewsurf.com) fonctionnent sans proxy.

