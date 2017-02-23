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

startRouter(views, store);

if ('serviceWorker' in navigator) {
  var options = null;
  navigator.serviceWorker.register('./service-worker.js', options).then(function(registration) {
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
/*
              this.fire('notify', {
                icon: 'update',
                message: 'new-version-app',
                buttonText: 'refresh',
                buttonTapHandler: function() { // Handler for app-snackbar _onButtonTap
                  window.location.reload();
                },
                duration: 0 // Duration 0 indications shows the app-snackbar indefinitely.
              });
*/
              console.log('The Service Worker was updated. Reload page for the new version.');
            } else {
/*
              this.fire('notify', {
                type: 'confirm',
                icon: 'cached',
                message: 'caching-complete'
              });
*/
              console.log('A new Service Worker was installed.');
            }
          break;
          case 'redundant':
/*
            this.fire('notify', {
              icon: 'update',
              message: 'new-version-app',
              buttonText: 'refresh',
              buttonTapHandler: function() { // Handler for app-snackbar _onButtonTap
                window.location.reload();
              },
              duration: 0 // Duration 0 indications shows the app-snackbar indefinitely.
            });
*/
            this._trackError('The installing Service Worker became redundant. Reload page for the new version.');
          break;
          default:
            console.log("New Service Worker state: ", installingWorker.state);
        }
      }
    }
  })
}

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
