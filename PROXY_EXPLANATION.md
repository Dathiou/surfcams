# Comment le proxy contourne l'erreur 403

## Le problème

Quand votre navigateur charge un iframe pointant vers `platforms5.joada.net` :

**Sans proxy :**
```
Navigateur → joada.net (iframe)
Referer: https://votre-site.netlify.app  ❌ (non autorisé)
→ 403 Forbidden
```

joada.net vérifie le header `Referer` et bloque les requêtes qui ne viennent pas d'un domaine autorisé.

**Important :** Le 403 peut se produire à deux moments :
1. Quand l'iframe charge la page HTML initiale
2. Quand le JavaScript dans la page charge des ressources (vidéo, CSS, JS)

## La solution : Proxy serveur

Avec le proxy, le flux est différent :

```
Navigateur → Votre proxy → joada.net
                    ↓
            Referer: https://viewsurf.com/  ✅ (autorisé)
            Origin: https://viewsurf.com   ✅ (autorisé)
                    ↓
            joada.net accepte la requête
                    ↓
            Le proxy récupère le HTML
                    ↓
            Le proxy corrige les URLs relatives
                    ↓
            Le proxy renvoie le HTML au navigateur
                    ↓
            L'iframe charge depuis votre proxy
            (donc pas de vérification de Referer côté client)
```

**Points clés :**
1. Le navigateur charge l'iframe depuis VOTRE proxy (pas directement depuis joada.net)
2. Votre proxy fait une requête serveur vers joada.net avec `Referer: https://viewsurf.com/`
3. joada.net voit le Referer comme viewsurf.com (domaine autorisé) et accepte
4. Le proxy récupère le HTML, corrige les URLs relatives, et le renvoie
5. L'iframe charge depuis votre domaine, donc pas de vérification de Referer côté client

## Pourquoi ça fonctionne

**Côté serveur :**
- Le header `Referer` est contrôlé par le CLIENT (navigateur ou serveur)
- Quand votre proxy serveur fait la requête, il peut définir n'importe quel Referer
- joada.net ne peut pas savoir que la requête vient réellement de votre site

**Côté client :**
- L'iframe charge depuis votre proxy (votre domaine)
- Le JavaScript dans l'iframe voit `document.referrer` comme votre domaine
- Mais les ressources (vidéo, CSS, JS) sont chargées depuis joada.net avec les URLs corrigées
- Ces ressources peuvent encore vérifier le Referer, mais elles verront votre proxy comme referrer

**Note :** Si joada.net vérifie aussi `document.referrer` dans le JavaScript côté client, cela pourrait encore poser problème. Dans ce cas, il faudrait aussi modifier le JavaScript dans le HTML pour contourner ces vérifications.

## Limitations possibles

Si joada.net utilise des vérifications plus sophistiquées (vérification de l'IP source, JavaScript côté client, etc.), le proxy pourrait ne pas fonctionner. Mais dans la plupart des cas, la vérification du Referer est la seule protection utilisée.

## Test

Pour tester si le proxy fonctionne :

1. **Testez l'URL du proxy directement :**
   ```
   https://votre-site.netlify.app/.netlify/functions/proxy?url=https%3A%2F%2Fplatforms5.joada.net%2Fembeded%2Fembeded.html%3Fuuid%3D...
   ```

2. **Si vous voyez du HTML** (pas une erreur 403), le proxy fonctionne !

3. **Si vous voyez toujours 403**, joada.net utilise peut-être une autre méthode de vérification. Dans ce cas, essayez :
   - D'autres Referers autorisés (gosurf.fr, quiksilver.fr, etc.)
   - D'autres headers (Origin, etc.)

