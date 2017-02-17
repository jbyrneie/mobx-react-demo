import React from 'react';

//models
import {Route} from 'mobx-router';

//components
import ProductList from './components/productList';
import ProductDetails from './components/productDetails';
import Iframe from './components/iframe';

const views = {
  home: new Route({
    path: '/',
    component: <ProductList/>
  }),
  iframe: new Route({
    path: `/iframe`,
    component: <Iframe/>
  }),
  product: new Route({
    path: '/product',
    component: <ProductDetails/>,
    beforeEnter: (route, params, store) => {
      const path = window.location.pathname.split('/')
      const desiredProjectId = path[path.length-1]
    }
  }),
  products: new Route({
    path: '/products',
    component: <ProductList/>
  })
};
export default views;
