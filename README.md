# toQueryString
Convertie une variable en Query String, afin de simplifier l'envoie de données x-www-form-urlencoded

Exemple d'utilisation :
```js
toQueryString({
  param: 'un String',
  pages: 12
}); // Retourne : param=un%20String&pages=12
```

Capable de convertir: Array, Objet, Int et String en QueryString. En cas de bug ou comportement bizarre de la fonction n'hésitez pas a me le dire.
