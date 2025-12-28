# Débogage Local - Guide Rapide

## Étape 1 : Installer les dépendances

```bash
cd "/Users/damien.thioulouse/codebase perso/surfcams"
npm install
```

## Étape 2 : Démarrer le serveur

```bash
npm start
```

Le serveur devrait démarrer sur `http://localhost:3000`

## Étape 3 : Ouvrir le site

Ouvrez votre navigateur et allez sur :
```
http://localhost:3000
```

## Étape 4 : Vérifier la console

1. Ouvrez la console du navigateur (`F12`)
2. Regardez l'onglet **Console** pour les messages `[Proxy] Intercepting...`
3. Regardez l'onglet **Network** pour voir les requêtes

## Ce que vous devriez voir

### Si ça fonctionne :
- ✅ La webcam Hossegor s'affiche
- ✅ Messages `[Proxy] Intercepting fetch:` ou `[Proxy] Intercepting XHR:` dans la console
- ✅ Requêtes vers `http://localhost:3000/api/proxy` dans l'onglet Network

### Si ça ne fonctionne pas :
- ❌ Erreurs dans la console
- ❌ Requêtes vers `platforms6.joada.net` qui échouent avec CORS
- ❌ Pas de messages `[Proxy] Intercepting...`

## Dépannage

### Le serveur ne démarre pas
```bash
# Vérifiez que le port 3000 est libre
lsof -ti:3000

# Si un processus utilise le port, tuez-le :
kill -9 $(lsof -ti:3000)

# Puis redémarrez
npm start
```

### Erreur "Cannot find module"
```bash
npm install
```

### La webcam ne se charge pas
1. Vérifiez que `PROXY_ENABLED = true` dans `script.js`
2. Vérifiez que le serveur tourne sur le port 3000
3. Vérifiez la console pour les erreurs

### Les requêtes ne passent pas par le proxy
- Vérifiez que `PROXY_BASE_URL` est bien `http://localhost:3000/api/proxy` quand vous êtes sur localhost
- Le code détecte automatiquement localhost maintenant

