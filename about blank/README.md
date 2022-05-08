# About Blank

The term about:blank (a.k.a. About Blank) defines nothing more than an empty page on your browser tab, whether you use Firefox, Chrome, Edge, Safari, or any other type of browser. The page appears with the label about:blank in both the address bar and the tab's page title.

## Pro's

- Completely hides page URL
- Supports hash navigation
- Does not break when original page is closed

## Con's

- Complicated to change content
- Breaks when page is reloaded

# Examples

A new `about:blank` page can easily be opened with javascript using the built in `window.open()` function.

```js
const win = window.open("about:blank", "_blank");
```

Adding content to the window is a bit more difficult than the other methods mentioned.
We can use JavaScript's built in DOM (Document Object Model) or an external one such as jQuery or Umbrellajs to create and add elements onto the document.

```js
// getting the document
const doc = win.document;

// changing the title
doc.title = "About Blank Example";

// adding content
const h1 = doc.createElement("h1");
h1.innerText = "About Blank Example";
doc.body.appendChild(h1);
```

See [example.js](/example.js) for a more in depth example.
