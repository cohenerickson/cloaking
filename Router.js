let URL = "";
let ROUTES = [];
let ERRS = {};

class Router {  
  constructor (headScope, bodyScope) {
    this.headScope = headScope;
    this.bodyScope = bodyScope;
    
    // Intercept click events and virtualize navigation
    window.addEventListener("click", (clickEvent) => {
      let link = (isLink(clickEvent.target) ?? "")
        .split(location.host)
        .splice(1)
        .join(location.host);
      if (link) {
        if (/^(\/$|(\.){0,2}\/[^\/])/.test(link)) {
          console.debug(`Navigating to '${link}'`);
          clickEvent.preventDefault();
          if (URL === link) return;
          URL = link;
          this.#navigate();
        } 
      }
    });
  }

  // register a new route
  get (regex, contentFn) {
    if (!regex instanceof RegExp)
      return console.error(new TypeError("First paramater must be of type RegExp."));
    if (typeof contentFn !== "function")
      return console.error(new TypeError("Seccond paramater must be of type Function."));
    ROUTES.push([regex, contentFn]);
  }

  // register error handlers
  err (code, contentFn) {
    if (isNaN(code))
      return console.error(new TypeError("First paramater must be of type Number."));
    if (typeof contentFn !== "function")
      return console.error(new TypeError("Seccond paramater must be of type Function."));
    ERRS[code] = contentFn;
  }

  // navigate to a certain url programicaly.
  start (url) {
    if (typeof url !== "string")
      return console.error(new TypeError("First paramater must be of type String."));
    URL = url;
    this.#navigate();
  }

  // handle the content change
  #navigate () {
    let s = false
    for (let i = 0; i < ROUTES.length; i++) {
      const route = ROUTES[i];
      if (route[0].test(URL)) {
        const content = route[1]({
          url: URL
        });
        // Update content
        if (content.head) {
          if (typeof content.head !== "string")
            return console.error(new TypeError("Head must be of type String or Null."));
          this.headScope.innerHTML = content.head;
        }
        if (content.body) {
          if (typeof content.body !== "string")
            return console.error(new TypeError("Body must be of type String."));
          this.bodyScope.innerHTML = content.body;
        } else {
          return new TypeError("Body must be of type String.");
        }
        s = true;
        break;
      }
    }

    if (!s) {
      // handle 404
      console.debug(`Redirecting to 404`);
      const content = ERRS[404]({
        url: URL
      });
      if (!content) return;
      if (content.head) {
        if (typeof content.head !== "string")
          return console.error(new TypeError("Head must be of type String or Null."));
        this.headScope.innerHTML = content.head;
      }
      if (content.body) {
        if (typeof content.body !== "string")
          return console.error(new TypeError("Body must be of type String."));
        this.bodyScope.innerHTML = content.body;
      } else {
        return new TypeError("Body must be of type String.");
      }
    }
  }
}

// check if element is wrapped by a link
function isLink (element) {
  const type = element.tagName.toLowerCase();
  if (type === "a") {
    const href = element.href;
    if (href) {
      return href;
    } else {
      return;
    }
  } else {
    const parent = element.parentElement;
    if (parent) {
      isLink(parent);
    } else {
      return;
    }
  }
}

export default Router;