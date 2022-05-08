# Data URLs

The data URI scheme is a uniform resource identifier scheme that provides a way to include data in-line in Web pages as if they were external resources. It is a form of file literal or here document.

## Pro's

- Easier to create than Blob URLs
- Completely hide origin

## Con's

- Unable to be opened by JavaScript
- Limited length/data
- Cannot directly load external scripts

# Examples

Creating a data URL is fairly simple, all we need to know is the content type `text/html`

```js
const HTML = `<h1>Data URL Example</h1>`;

const dataURL = `data:text/html;charset=utf8,${encodeURI(HTML)}`;
```

Loading external scripts cannot be done directly through `<script>` tags however we can write a function to load them.

```js
function loadScript(src) {
  const script = document.createElement("script");
  script.src = src;
  document.body.appendChild(script);
}
```

See [example.js](/example.js) for a more in depth example.
