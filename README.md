# A demo PWA App written in React/Mobx/Material UI
This repo is a simple PWA App written in React, Mobx and Material UI. The App is also a PWA (Progressive Web App) which means it can be deployed as a standalone Mobile App and behave as a native App on a Mobile device.

A few things to note
- there is very little CSS in the App, most of it is inline or provided by default by Material UI
- it is common practice to use in-line css, example
```
  <div style={{fontSize: '.95em', color: '#4e4e4e', fontFamily:'"Roboto", sans-serif'}}>
    {product.description}
  </div>
```
- or define an in-line css object, example
```
  const styles = {button: {
                            margin: 12,
                           }
                 };
```
- components and css are imported rather than included
- webpack runs in the background and rebuilds the App in dev mode when files are changed
- the 'npm run build' task creates a build/ folder, optimizes and minifies the code and creates one JS and CSS file for the App
- the JS and CSS files have a hash included in their name (example, main.992d8cfe.js) to prevent stale caching

## To run the demo
```sh
The demo is deployed to Heroku and can be accessed at https://pure-fjord-81149.herokuapp.com/
```

## Clone and run the demo locally
```sh
git clone https://github.com/jbyrneie/mobx-react-demo.git

cd mobx-react-demo
npm install

** Ensure NODE_ENV=development in .env file
source ./.env && npm start

Browse to http://localhost:9988
```
To understand more about React/Mobx/Material Ui and how the demo was created, continue reading below

## Components
- ReactJS: A set of NPM packages for building User Interfaces, for details go to https://facebook.github.io/react/ 
- Mobx: An NPM package that makes state management simple and scalable by transparently applying functional reactive programming (TFRP). In english, you create data models (Stores) for your data, make them "observable" and "inject" the Stores into the Components in which you wish to use them. When a Store is updated, the "observing" components will rerender. For more details go to https://mobx.js.org/
- Material UI: An NPM package of React Components that implement Google's Material Design. In summary it is a set of components to create Lists, Tables, Buttons, Dialogs, Grids, etc. See https://www.npmjs.com/package/material-ui and http://www.material-ui.com/#/components/app-bar (for the Components). Dont mix it up with https://material.io/, this is just a Google Design Site and not the implementation.

## Creating a React App
There is a good tutorial at https://github.com/facebookincubator/create-react-app, the following builds a standalone App. The nice thing is that it is built using Webpack and creates a boilerplate App. Have a look at the package.json file, you will see scripts to start the App in "Dev" mode or build the App for "Production"

```sh
npm install -g create-react-app

create-react-app my-app
cd my-app/
npm start
```

This will create a directory called `my-app` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the required dependencies:

```
my-app/
  README.md
  node_modules/
  package.json
  .gitignore
  public/
    favicon.ico
    index.html
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

The entry point to the App is the id=root in public/index.html
```
<div id="root"></div>
```

This id is rendered in src/index.js
```
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

Effectively this renders the \<App /\> component when the App is loaded

## Mobx
Mobx is used for state management and Client side routing (npm mobx-router).

A route consists of a route name, path and the react component to render the UI, example,

```
home: new Route({
    path: '/',
    component: <ProductList/>
  })
```

To use routing, the App renders the React MobxRouter Component instead of a "regular" React Component (\<App /\>), ie., src/index.js changes to
```
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <div>
        <section>
          <MobxRouter/>
        </section>
      </div>
    </MuiThemeProvider>
  </Provider>
  ,document.getElementById('root')
)
```
* The \<MuiThemeProvider\> component is required for Material UI and is explained below

The Mobx Routes are defined in /src/views.js

## Material UI
Material-UI components require a theme to be provided. The quickest way to get up and running is by using the MuiThemeProvider to inject the theme into your application context. After that, you can use any of the components (Buttons, Tables, Grids etc)

The \<MuiThemeProvider \> Component is injected in the App entry point /src/index.js as follows

```
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <div>
        <section>
          <MobxRouter/>
        </section>
      </div>
    </MuiThemeProvider>
  </Provider>
  ,document.getElementById('root')
)
```
An example of a Material UI component is in src/components/appBar.js. This is the App Bar at the top of some pages. The reason this component is in a seprate file is that it is included in some components (src/components/productList.jst) and not in others (src/components/productSummary.js) and also has optional attributes (backArrow={true})

```
  <AppBar
        title="My Products Store"
        iconElementLeft={leftIcon}
        onLeftIconButtonTouchTap={this.clickLeftIcon.bind(this) }
      />
```
## Mobx Stores
Stores can be found in any Flux architecture and can be compared a bit with controllers in the MVC pattern. The main responsibility of stores is to move logic and state out of your components into a standalone testable unit that can be used in both frontend and backend JavaScript.

Most applications benefit from having at least two stores. One for the UI state (appStore) and one or more for the domain state (productStore and productsStore).

The appStore contains App wide state, such as Session information, Information that affects the UI globally, etc
The domain state stores hold the data your application is all about. Product Lists, product item, etc

A Store is a Class that extends extendObservable, example /src/stores/productsStore.js

```
class ProductsStore {
  constructor() {
    extendObservable(this, {
      title: 'MyStore Title Default',
      products: []
    });
  }
```
and is "injected" into a Component that wishes to "observe" it, example, /src/components/productList.js

```
export default inject((allStores) => ({ ...allStores }))(observer(ProductList))
```

## PWA
Progressive Web App uses modern web capabilities to deliver an app-like user experience to a Mobile device. Native mobile Apps do things like send push notifications, work offline, look and feel like an app, load on the homescreen, etc. Mobile Web Apps accessed in a mobile browser, by comparison, historically haven’t done those things. Progressive Web Apps fix that with new Web APIs and new design concepts.
For more information on PWAs, visit https://developers.google.com/web/progressive-web-apps/ 

Progressive Web Apps have the following characteristics:
- Progressive - By definition, a progressive web app must work on any device and enhance progressively, taking advantage of any features available on the user’s device and browser.
- Discoverable - Because a progressive web app is a website, it should be discoverable in search engines. This is a major advantage over native applications, which still lag behind websites in searchability.
- Linkable - As another characteristic inherited from websites, a well-designed website should use the URI to indicate the current state of the application. This will enable the web app to retain or reload its state when the user bookmarks or shares the app’s URL.
- Responsive - A progressive web app’s UI must fit the device’s form factor and screen size.
- App-like - A progressive web app should look like a native app and be built on the application shell model, with minimal page refreshes.
- Connectivity-independent. It should work in areas of low connectivity or offline (our favorite characteristic).
- Re-engageable - Mobile app users are more likely to reuse their apps, and progressive web apps are intended to achieve the same goals through features such as push notifications.
- Installable - A progressive web app can be installed on the device’s home screen, making it readily available.
- Fresh - When new content is published and the user is connected to the Internet, that content should be made available in the app.
- Safe - Because a progressive web app has a more intimate user experience and because all network requests can be intercepted through service workers, it is imperative that the app be hosted over HTTPS to prevent man-in-the-middle attacks. 

To enable the App to be a PWA, the following is required
- A public/manifest.json file - this file describes the App Shell, the icon for the App on the device's home screen and the entry point to the App
- A build/serviceworker.js file - this file is auto created at build time (in the package.json file) using the npm package sw-precache
```
"build": "react-scripts build && sw-precache --config=sw-precache-config.js"
```
The sw-precache-config.js file specifies what files are to be cached on the Mobile device so that it can work offline, effectively all the files in the build folder (except the map files), ie., the CSS and JS files

The build/serviceworker.js file defines and object called precacheConfig which lists all the files to be cached. Each file has an asoociated hash value which is used to determine if the file has changed and whether the Mobile Device cache needs to be invalidated.
```
var precacheConfig = [["index.html","145091d983a43281a75be7a1c8d00fff"],["manifest.json","0b78304f4e7db378fcc811549e7b6074"],["static/css/main.f1a78091.css","68b67d9d0a5b98fa07f00cb03762c22c"],["static/js/main.992d8cfe.js","c5d9dd1873216dc3f09e91f5c94c539f"]]
```

The manifest.json file needs to be included in the App as follows
```
public/index.html
    <link rel="manifest" href="manifest.json">
```
This enables the App to be detected as a PWA by the Mobile OS

The serviceworker.js needs to be registered in order to cache the App's JS and CSS files as follows
```
public/index.html
<body>
    <script>
      if ('serviceWorker' in navigator) {
        var options = null;
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
           // For check for update
          registration.update().then(function() {
            console.log('serviceWorker update done...')
          });

          if (registration.active) {
            console.log('Service Worker already installed.');
          }

          registration.onupdatefound = function() {
            console.log('A new Service Worker version has been found...');
            var installingWorker = registration.installing;
            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
                case 'installed':
                  if (navigator.serviceWorker.controller) {
                    console.log('The Service Worker was updated. Reload page for the new version.');
                  } else {
                    console.log('A new Service Worker was installed.');
                  }
                break;
                case 'redundant':
                  this._trackError('The installing Service Worker became redundant. Reload page for the new version.');
                break;
                default:
                  console.log("New Service Worker state: ", installingWorker.state);
              }
            }
          }
        }).catch(function(error) {
          // registration failed
          console.log('Service Worker Registration failed with ' + error);
        });
      }
    </script>
    <div id="root"></div>
```
## How do you know the PWA is setup properly
- Go to https://pure-fjord-81149.herokuapp.com/, and open Google Chrome Developer tools Application tab to examine the App, you will see
  - the Manifest details, consisting of the App Name, starting url, icons for various device sizes, etc
  - the Serviceworker, the file sources and its status
  - the Cache Storage name and the list of files cached as specified in sw-precache-config.js
  
![alt tag](https://github.com/jbyrneie/mobx-react-demo/blob/master/documentation/pwa.png)

