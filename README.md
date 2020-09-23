# toQueryString
I've make this small script to convert a variable to a query string, in order to simplify sending x-www-form-urlencoded data.

How to use example :
```js
const formData = toQueryString({
   param: 'a string',
   pages: 12
}); // formData = "param=a%20string&pages=12"

fetch("myapp.url/api", {
   method: 'POST',
   headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
   },
   body: formData;
}).then(successFunction).catch(errFunction)
```

Able to convert: Array, Object, Int and String to query string.
