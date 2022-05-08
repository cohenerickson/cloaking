# Blob URLs

## Pro's

- Generaly `blob:` URLs have a greater size limitation than `data:` URLs, this means we can fit more code into one url.

- `blob:` URLs can also be opened automatically with JavaScript.

- These URLs also support loading external scripts unlike `data:` URLs.

## Con's

`blob:` URLs generaly don't hide the original url as well as `data:` urls do and generally fit into the format of `blob:<domain>/<id>`

## Examples

[This stack overflow post](https://stackoverflow.com/a/54466127/14635947) goes into how to turn a `data:` url for an image into a blob url however we can do the same thing with `html/text` type.
 above the following code is used for image `blob:` URLs.

```js
const base64ImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
const contentType = 'image/png';

const byteCharacters = atob(base64ImageData.substr(`data:${contentType};base64,`.length));
const byteArrays = [];

for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
  const slice = byteCharacters.slice(offset, offset + 1024);
  const byteNumbers = new Array(slice.length);
  for (let i = 0; i < slice.length; i++) {
    byteNumbers[i] = slice.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  byteArrays.push(byteArray);
}
const blob = new Blob(byteArrays, {type: contentType});
const blobUrl = URL.createObjectURL(blob);
```

We can modify this code in order to work with `text/html` instead of `image/png` content types. See below.

```js
const HTML = "<h1>Hello World</h1>";
const byteArrays = [];

for (let offset = 0; offset < HTML.length; offset += 1024) {
  const slice = HTML.slice(offset, offset + 1024);
  const byteNumbers = new Array(slice.length);
  for (let i = 0; i < slice.length; i++) {
    byteNumbers[i] = slice.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  byteArrays.push(byteArray);
}
const blob = new Blob(byteArrays, {type: "text/html"});
const blobUrl = URL.createObjectURL(blob);
```

These links can also be opened fairly simply in JavaScript. See below.

```js
window.open(blobUrl, '_blank');
```