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

import './index.css'

// Defer PWA install prompt until a "good" experience occurs

window.addEventListener('beforeinstallprompt', function(e) {
  console.log('beforeinstallprompt Event fired');
  alert('beforeinstallprompt')

  e.preventDefault();

  // Stash the event so it can be triggered later.
  store.appStore.setDeferredPrompt(e);

  return false;
});

startRouter(views, store);
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
