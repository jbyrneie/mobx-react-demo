import AppStore from './appStore';
import ProductsStore from './productsStore';
import ProductStore from './productStore';
import {RouterStore} from 'mobx-router';

const store = {
  appStore: new AppStore(),
  productStore: new ProductStore(),
  productsStore: new ProductsStore(),
  router: new RouterStore()
};

export default store;
