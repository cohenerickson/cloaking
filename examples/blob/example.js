// Write or generate your HTML code
const HTML = `
<!DOCTYPE html>
<html>
  <head>
    <title>Blob URL Example</title>
    <script>
      console.log("Script loaded.");
    </script>
    <style>
      * {
        background: black;
        color: white;
      }
    </style>
  </head>
  <body>
    <h1>Blob URL Example.</h1>
  </body>
</html>
`;

// Turn the HTML into an array of bytes
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

// Turn the array of bytes into a Blob object
const blob = new Blob(byteArrays, {type: "text/html"});
// Turn the Blob into a URL
const blobUrl = URL.createObjectURL(blob);

// Open the link in a new tab
window.open(blobUrl, '_blank');