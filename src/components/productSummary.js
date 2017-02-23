import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import Snackbar from 'material-ui/Snackbar';
import ActionZoomIn from 'material-ui/svg-icons/action/zoom-in';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import _ from 'lodash';
import { ListItem } from 'material-ui/List'
import {blueGrey600, lightBlueA400} from 'material-ui/styles/colors';
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

  haideSnackBar(event) {
    this.props.store.productsStore.showDeleteSnackBar(false)
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
      marginRight:15,
      borderLeftWidth:1,
      borderLeftStyle:'solid',
      borderLeftColor: '#eee',
      paddingLeft:15
    }
    const iconStyles = {
      marginRight: 15,
      marginBottom: 30
    };
    const rightActions = <div style={actionsStyle}>
                            <ActionZoomIn style={iconStyles} color={lightBlueA400} onClick={this.details.bind(this)} />
                            <ActionDelete style={iconStyles} color={blueGrey600} onClick={this.delete.bind(this)} />
                        </div>
    const deletedMessage = this.props.store.productsStore.productTitle + " deleted"
    return (
      <div>
        <ListItem
          primaryText={<div onClick={this.details.bind(this)} style={{paddingRight:60}}>{product.title}</div>}
          secondaryText={<div onClick={this.details.bind(this)} style={{paddingRight:60}}>{product.description}</div>}
          secondaryTextLines={2}
          rightIcon={rightActions}
        />

        <Snackbar
          open={this.props.store.productsStore.showDeleteSnackBar}
          message={deletedMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(ProductSummary))
