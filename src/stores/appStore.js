import {extendObservable, action} from 'mobx';

class AppStore {
  constructor() {
    extendObservable(this, {
      title: 'My Products Store',
      user: undefined
    });
    console.log('user: %s', this.user)
  }

  setTitle = action(title => {
    console.log('AppStore setTitle: %s', title)
    this.title = title;
  });
}

export default AppStore;
