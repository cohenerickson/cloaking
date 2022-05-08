// opening the window
const win = window.open("about:blank", "_blank");

// getting the document
const doc = win.document;

// changing the title
doc.title = "About Blank Example";

// adding style
const style = doc.createElement("style");
style.innerHTML = `
* {
  background: black;
  color: white;
}
`;
doc.head.appendChild(style);

// adding content
const h1 = doc.createElement("h1");
h1.innerText = "About Blank Example";
doc.body.appendChild(h1);

// adding scripts
const script = doc.createElement("script");
script.innerHTML = `
console.log("Hello World");
`;
doc.body.appendChild(script);
