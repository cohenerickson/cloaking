# Exploit details

This exploit uses `data:text/html` urls in order to display content on the page, however these urls have limits, the length is limited, they cannot load external scripts (see below for work around).
Another limitation to these urls is that there isn't any way to navigate to different paths, this means that applications are limited to SPA's or to be through an IFRAME.

## Limitations

### Length

`data:` urls have a maximum length depending on what browser is being used.
Refer to [this stackoverflow](https://stackoverflow.com/a/41755526/14635947) post for more details.

### Load external scripts

External scripts cannot be loaded in the standard way `<script src="https://example.com/script.js"></script>`,  however there is a work around.
Inline scripts do work so we can create a script element with a `src` attribute and the add it to the document. See below for example.

```js
// load external scripts
function loadScript (src) {
  const script = document.createElement("script");
  script.src = src;
  document.body.appendChild(script);
}
```

```
data:text/html;charset=utf-8,<body></body><script>function loadScript (src) { const script = document.createElement("script"); script.src = src; document.body.appendChild(script); };loadScript("https://example.com/script.js")</script>
```

### SPAs

These pages are limited to SPAs (Single page applications) unless you embed a webpage using an IFRAME.
Even popular frameworks such as React or Vue may not work due to their routing system.
This pushed me to create my own router inspired by [expressjs](https://expressjs.com/) that intercepts click events.
The example code for the router is in `./Router.js`. See below for example usage.

```js
import Router from "./Router.js";

// create new router passing in the head and body elements
const app = new Router(document.head, document.body);

// register a route on '/' using regex.
app.get(/^\/(#.*|\?.*)?$/, (req) => {
  // req = { url: "/" }
  // req = { url: "/?q=queryStrings" }
  // req = { url: "/#hashStrings" }
  
  // return content for the head and body of the page.
  return {
    head: `<title>Home - example.com</title>`,
    body: `<h1>Hello World</h1>`
  }
});


// register a route on '/about'.
app.get(/^\/about\/?(#.*|\?.*)?$/, (req) => {
  // req = { url: "/about" }
  // req = { url: "/about?q=queryStrings" }
  // req = { url: "/about/#hashStrings" }

  // you can also use functions to change the output depending on the request.
  return {
    head: `<title>About - example.com</title>`,
    body: about(req)
  }
});

// Initiate
app.start("/");


function about (req) {
  return `
    <h1>Hello ${req.url}</h1>
  `;
}
```

```
data:text/html;charset=utf-8,<body></body><script>let URL = ""; let ROUTES = []; let ERRS = {}; class Router { constructor (headScope, bodyScope) { this.headScope = headScope; this.bodyScope = bodyScope; window.addEventListener("click", (clickEvent) => { let link = (isLink(clickEvent.target) ??%20"")%20.split(location.host)%20.splice(1)%20.join(location.host);%20if%20(link)%20{%20if%20(/^(\/$|(\.){0,2}\/[^\/])/.test(link))%20{%20console.debug(`Navigating%20to%20%27${link}%27`);%20clickEvent.preventDefault();%20if%20(URL%20===%20link)%20return;%20URL%20=%20link;%20this.#navigate();%20}%20}%20});%20}%20get%20(regex,%20contentFn)%20{%20if%20(!regex%20instanceof%20RegExp)%20return%20console.error(new%20TypeError("First%20paramater%20must%20be%20of%20type%20RegExp."));%20if%20(typeof%20contentFn%20!==%20"function")%20return%20console.error(new%20TypeError("Seccond%20paramater%20must%20be%20of%20type%20Function."));%20ROUTES.push([regex,%20contentFn]);%20}%20err%20(code,%20contentFn)%20{%20if%20(isNaN(code))%20return%20console.error(new%20TypeError("First%20paramater%20must%20be%20of%20type%20Number."));%20if%20(typeof%20contentFn%20!==%20"function")%20return%20console.error(new%20TypeError("Seccond%20paramater%20must%20be%20of%20type%20Function."));%20ERRS[code]%20=%20contentFn;%20}%20start%20(url)%20{%20if%20(typeof%20url%20!==%20"string")%20return%20console.error(new%20TypeError("First%20paramater%20must%20be%20of%20type%20String."));%20URL%20=%20url;%20this.#navigate();%20}%20#navigate%20()%20{%20let%20s%20=%20false%20for%20(let%20i%20=%200;%20i%20<%20ROUTES.length;%20i++)%20{%20const%20route%20=%20ROUTES[i];%20if%20(route[0].test(URL))%20{%20const%20content%20=%20route[1]({%20url:%20URL%20});%20if%20(content.head)%20{%20if%20(typeof%20content.head%20!==%20"string")%20return%20console.error(new%20TypeError("Head%20must%20be%20of%20type%20String%20or%20Null."));%20this.headScope.innerHTML%20=%20content.head;%20}%20if%20(content.body)%20{%20if%20(typeof%20content.body%20!==%20"string")%20return%20console.error(new%20TypeError("Body%20must%20be%20of%20type%20String."));%20this.bodyScope.innerHTML%20=%20content.body;%20}%20else%20{%20return%20new%20TypeError("Body%20must%20be%20of%20type%20String.");%20}%20s%20=%20true;%20break;%20}%20}%20if%20(!s)%20{%20console.debug(%60Redirecting%20to%20404%60);%20const%20content%20=%20ERRS[404]({%20url:%20URL%20});%20if%20(!content)%20return;%20if%20(content.head)%20{%20if%20(typeof%20content.head%20!==%20"string")%20return%20console.error(new%20TypeError("Head%20must%20be%20of%20type%20String%20or%20Null."));%20this.headScope.innerHTML%20=%20content.head;%20}%20if%20(content.body)%20{%20if%20(typeof%20content.body%20!==%20"string")%20return%20console.error(new%20TypeError("Body%20must%20be%20of%20type%20String."));%20this.bodyScope.innerHTML%20=%20content.body;%20}%20else%20{%20return%20new%20TypeError("Body%20must%20be%20of%20type%20String.");%20}%20}%20}%20}%20function%20isLink%20(element)%20{%20const%20type%20=%20element.tagName.toLowerCase();%20if%20(type%20===%20"a")%20{%20const%20href%20=%20element.href;%20if%20(href)%20{%20return%20href;%20}%20else%20{%20return;%20}%20}%20else%20{%20const%20parent%20=%20element.parentElement;%20if%20(parent)%20{%20isLink(parent);%20}%20else%20{%20return;%20}%20}%20};%20const%20app%20=%20new%20Router(document.head,%20document.body);%20app.get(/^\/(#.*|\?.*)?$/,%20(req)%20=>%20{%20return%20{%20head:%20%60<title>Home%20-%20example.com</title>%60,%20body:%20%60<h1>Hello%20World</h1><br><a%20href="/about">About</a>%60%20}%20});%20app.get(/^\/about\/?(#.*|\?.*)?$/,%20(req)%20=>%20{%20return%20{%20head:%20%60<title>About%20-%20example.com</title>%60,%20body:%20about(req)%20}%20});%20app.start("/");%20function%20about%20(req)%20{%20return%20%60%20<h1>Hello%20${req.url}</h1><br><a%20href="/">Return%20Home</a>%20%60;%20}</script>
```

### Opening links

At the moment there does not seem to  be a way to automatically open data URLs, the only way that seems to work was using `blob:` urls instead of `data:` URLs.

See below or [this stack overflow post](https://stackoverflow.com/a/54466127/14635947) for more details.

## Implementations

Radon Games has an option on the [settings](https://radon.games/settings) page labeled `URL Cloaking`.
To enable the feature select `data:text/html Cloaking (Experimental)` and then click on save.
The page will not automatically open due to the limitations stated above, however when you click the page it will open a new tab with the link that the user can then open.

# Going into blob: URLs

## Pro's

Generaly `blob:` URLs have a greater size limitation than `data:` URLs, this means we can fit more code into one url.

`blob:` URLs can also be opened automatically with JavaScript.

These URLs also support loading external scripts unlike `data:` URLs.

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