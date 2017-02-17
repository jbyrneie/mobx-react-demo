import React from 'react';
import ReactDOM from 'react-dom';
import {MobxRouter, startRouter} from 'mobx-router';
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

//mobx
import {Provider} from 'mobx-react';
import store from './stores/index';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

//router
import views from './views';

startRouter(views, store);


/*
ReactDOM.render(
  <Provider store={store}>
    <div>
      <h1>{store.appStore.title}</h1>
      <button onClick={() => store.router.goTo(views.home)}> go home</button>
      <MobxRouter/>
    </div>
  </Provider>, document.getElementById('root')
)
*/

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
