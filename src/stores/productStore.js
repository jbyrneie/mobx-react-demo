import {extendObservable, action} from 'mobx';

class ProductStore {
  constructor() {
    extendObservable(this, {
      product: {}
    });
  }

  setProduct = action(product => {
    this.product = product;
  });
}

export default ProductStore;
