import {extendObservable, action} from 'mobx';
import _ from 'lodash';

class ProductsStore {
  constructor() {
    extendObservable(this, {
      products: [],
      showDeleteSnackBar: false,
      productTitle:''
    });
  }

  addProduct = action(product => {
    this.products.push(product)
  });

  getProduct = action(id => {
    const product = _.find(this.products, function(p) {
      return p.id === id;
    });
    return product
  });

  deleteProduct = action(index => {
    this.showDeleteSnackBar = true
    let products = this.products

    if (products.length > 0) {
      this.productTitle = products[index].title
      products.splice(index, 1)
      this.products = products
      localStorage.setItem('products', JSON.stringify(products))
    }

    if (products.length === 0)
      this.getProductList()
  });

  getProductList = action(() => {
    let products = localStorage.getItem('products')
    products = JSON.parse(products)

    if (products && products.length > 0)
      return this.products = products

    this.products = [{id:1, title:'Product 1', description:'A very long description for Product1. A very long description for Product1. A very long description for Product1. A very long description for Product1. A very long description for Product1. A very long description for Product1.'},
                     {id:2, title:'Product 2', description:'Product2 description'},
                     {id:3, title:'Product 3', description:'Product3 description'},
                     {id:4, title:'Product 4', description:'A very long description for Product4. A very long description for Product1. A very long description for Product1. A very long description for Product1. A very long description for Product1. A very long description for Product1.'},
                     {id:5, title:'Product 5', description:'Product5 description'},
                     {id:6, title:'Product 6', description:'Product6 description'},
                     {id:7, title:'Product 7', description:'Product2 description'},
                     {id:8, title:'Product 8', description:'Product8 description'},
                     {id:9, title:'Product 9', description:'Product3 description'},
                     {id:10, title:'Product 10', description:'A very long description for Product10. A very long description for Product1. A very long description for Product1. A very long description for Product1. A very long description for Product1. A very long description for Product1.'},
                     {id:11, title:'Product 11', description:'Product11 description'},
                     {id:12, title:'Product 12', description:'Product12 description'}
                    ]
  });
}

export default ProductsStore;
