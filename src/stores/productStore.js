import {extendObservable, action} from 'mobx';

class ProductStore {
  constructor() {
    extendObservable(this, {
      product: {}
    });
  }

  setProduct = action(product => {
    console.log('setProduct: %s', JSON.stringify(product))
    this.product = product;
  });
}

export default ProductStore;
