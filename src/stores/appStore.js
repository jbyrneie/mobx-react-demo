import {extendObservable, action} from 'mobx';

class AppStore {
  constructor() {
    extendObservable(this, {
      title:'My Products Store',
      deferredPrompt:null
    });
  }

  setDeferredPrompt = action( (deferredPrompt) => {
    console.log('setDeferredPrompt deferredPrompt: %s', deferredPrompt)
    this.deferredPrompt = deferredPrompt
  })

  setTitle = action(title => {
    this.title = title;
  });
}

export default AppStore;
