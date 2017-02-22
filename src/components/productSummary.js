import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';
import { ListItem } from 'material-ui/List'
import {white, grey400, lightBlueA400} from 'material-ui/styles/colors';
import views from '../views'

class ProductSummary extends Component {
  details(event) {
    const {router: {goTo}} = this.props.store
    this.props.store.productStore.setProduct(this.props.product)
    goTo(views.product)
  }

  delete(event) {
    this.props.store.productsStore.deleteProduct(this.props.index)
  }

  render() {
    console.log('ProductSummary render.....')
    const product = this.props.product

    const actionsStyle = {
      display:'flex',
      width:'auto',
      height:'100%',
      flexDirection:'row',
      alignItems:'flex-end',
      margin:0,
      marginRight:10,
      borderLeftWidth:1,
      borderLeftStyle:'solid',
      borderLeftColor: '#eee',
      paddingLeft:15
    }

    const rightActions = <div style={actionsStyle}>
                            <RaisedButton label="Details" onClick={this.details.bind(this)} style={{marginLeft:8, marginBottom:18}} labelColor={white} backgroundColor={lightBlueA400}/>
                            <RaisedButton label="Delete" onClick={this.delete.bind(this)} style={{marginLeft:8, marginBottom:18}} labelColor={white} backgroundColor={grey400}/>
                        </div>

    return (
      <div>
        <ListItem
          primaryText={<div onClick={this.details.bind(this)} style={{paddingRight:200}}>{product.title}</div>}
          secondaryText={<div onClick={this.details.bind(this)} style={{paddingRight:200}}>{product.description}</div>}
          secondaryTextLines={2}
          rightIcon={rightActions}
        />
      </div>
    );
  }
}

//export default observer(['store'], ProductSummary);
export default inject((allStores) => ({ ...allStores }))(observer(ProductSummary))
