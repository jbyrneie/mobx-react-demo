# A demo App written in React/Mobx/Material UI
This repo is a simple App written in React, Mobx and Material UI.

## Components
- ReactJS: A set of NPM packages for building User Interfaces, for details go to https://facebook.github.io/react/ 
- Mobx: An NPM package that makes state management simple and scalable by transparently applying functional reactive programming (TFRP). In english, you create data models (Stores) for your data and you "observe" the components that use these Stores. When a Store is updated, the "observing" components will rerender. For more details go to https://mobx.js.org/
- Material UI: An NPM package of React Components that implement Google's Material Design. In summary its is a set of components to create Lists, Tables, Buttons, Dialogs, Grids, etc. See https://www.npmjs.com/package/material-ui and http://www.material-ui.com/#/components/app-bar (for the Components). Dont mix it up with https://material.io/, this is just a Google Design Site and not the implementation.

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

To use routing, the App renders a MobxRouter Component instead of a React Component (\<App /\>), ie., src/index.js changes to
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

