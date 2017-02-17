import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import AppBar from './appBar'
import _ from 'lodash';
import { ListItem } from 'material-ui/List'
import {grey400, lightBlueA400, cyan500} from 'material-ui/styles/colors';
import views from '../views'

class ProductSummary extends Component {
  navigate(event) {
    const {router: {goTo}} = this.props.store
    this.props.store.productStore.setProduct(this.props.product)
    goTo(views.product)
  }

  render() {
    const product = this.props.product
    const styles = {
                      button: {
                        margin: 12,
                      }
                    };

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
                            <RaisedButton label="Details" onClick={this.navigate.bind(this)} style={{marginLeft:8, marginBottom:18}} labelColor='white' backgroundColor={lightBlueA400}/>
                        </div>

    return (
      <div>
        <ListItem onClick={this.navigate.bind(this)}
          primaryText={<div style={{paddingRight:70}}>{product.title}</div>}
          secondaryText={<div style={{paddingRight:70}}>{product.description}</div>}
          secondaryTextLines={2}
          rightIcon={rightActions}
        />
      </div>
    );
  }
}

//export default observer(['store'], ProductSummary);
export default inject((allStores) => ({ ...allStores }))(observer(ProductSummary))
