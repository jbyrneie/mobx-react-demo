import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import _ from 'lodash';
import { List } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import ProductSummary from './productSummary'
import AppBar from './appBar'
import '../products.css'

class ProductList extends Component {
  componentDidMount() {
    this.props.store.productsStore.getProductList(this.props.store.router.queryParams)
    console.log('#Products: %s', this.props.store.productsStore.products.length)
  }

  render() {
    console.log('ProductList render....')

    return (
      <div>
        <AppBar/>
        <section id='items-list' style={{backgroundColor: this.props.store.productsStore.products.length ? '#efefef' : '#ffffff'}}>
          <div>
            <List className='list-wrap' style={{padding:0}}>
              {
                _.uniqBy(this.props.store.productsStore.products, 'id').map( (p,i) => {
                  return (
                    <div key={p.id}>
                      <ProductSummary product={p} index={i}/>
                      <Divider/>
                    </div>
                  )
                })
              }
            </List>
          </div>
        </section>
      </div>
    );
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(ProductList))
