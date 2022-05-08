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

window.open(blobUrl, '_blank');