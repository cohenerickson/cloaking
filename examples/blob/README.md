# Blob URLs

Blob URL/Object URL is a pseudo protocol to allow Blob and File objects to be used as URL source for things like images, download links for binary data and so forth. For example, you can not hand an Image object raw byte-data as it would not know what to do with it.

## Pro's

- Blob URLs have a greater size limitation than data URLs, this means we can fit more code into one URL

- Blob URLs can also be opened automatically with JavaScript's `window.open()` function

- These URLs also support directly loading external scripts unlike data URLs

## Con's

- Blob URLs don't hide the original URL as well as data URLs or about:blank does and fit into the format of `blob:<domain>/<id>`
- Blob URLs can only be accessed while the original page is open

# Examples

[This stack overflow post](https://stackoverflow.com/a/54466127/14635947) goes into how to turn a data URL for an image into a blob URL however we can do the same thing with `text/html` type.
The code below is used for image blob URLs.

```js
const base64ImageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
const contentType = "image/png";

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
const blobURL = URL.createObjectURL(blob);
```

We can modify this code in order to work with `text/html` instead of `image/png` content types.

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
const blobURL = URL.createObjectURL(blob);
```

These links can also be opened in JavaScript using `window.open()`.

```js
window.open(blobURL,"_blank");
```