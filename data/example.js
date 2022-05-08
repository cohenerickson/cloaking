// Write or generate your HTML code
const HTML = `
<!DOCTYPE html>
<html>
  <head>
    <title>Data URL Example</title>
    <style>
      * {
        background: black;
        color: white;
      }
    </style>
  </head>
  <body>
    <h1>Data URL Example.</h1>
  </body>
  <script>
    console.log("Hello World");

    function loadScript(src) {
      const script = document.createElement("script");
      script.src = src;
      document.body.appendChild(script);
    }

    loadScript("https://example.com/script.js");
  </script>
</html>
`;

// Turn HTML code into a data URL
const dataURL = `data:text/html;charset=utf8,${encodeURI(HTML)}`;

console.log(dataURL);
