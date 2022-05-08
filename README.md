# URL Cloaking

URL cloaking is the act of hiding the actual domain name of a website from the URL field of a user's web browser.

## Methods

- about:blank
- Data URL
- Blob URL

### about:blank

The about:blank method uses the `window.open()` function to open a new blank tab with the URL of `about:blank`. 

[Read more.](/about%20blank)

### Data URL

The data URL method uses data urls as the name sugests to display content through the content type `text/html`, an example of a data url is `data:text/html;charset=utf8,Hello-World`.

[Read more.](/data)

### Blob URL

The blob URL method is similar to the Data URL method, it uses JavaScript's built in `Blob` class in order to generate a file-like object that can then be viewed by the user.

[Read more.](/blob)

Have another method? Make an issue or pull request.