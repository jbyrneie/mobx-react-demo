import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import AppBar from './appBar'
import views from '../views'
import '../products.css'
import AddToHomeScreenModal from './addToHomeScreenModal'

class ProductDetails extends Component {
  buttonClick(event) {
    const {router: {goTo}} = this.props.store
    goTo(views.iframe, {url:'https://services.glgresearch.com/referral?source=mob-react-demo'})
  }

  render() {
    console.log('ProductDetails render....')
    const product = this.props.store.productStore.product
    const styles = {
                      button: {
                        margin: 12,
                      }
                    };

    return (
      <div>
        <AppBar backArrow={true}/>
        <AddToHomeScreenModal />
        <section id='items-list' style={{backgroundColor: '#efefef'}}>
            <div className='list-wrap' style={{backgroundColor: '#fff', padding:20}}>
              <h1 style={{fontFamily:'"Helvetica Neue",Helvetica,Arial,sans-serif', fontSize:'1.5em'}}>{product.title}</h1>
              {
                <div>
                  <div style={{fontSize: '.95em', color: '#4e4e4e ', fontFamily:'"Roboto", sans-serif'}}>
                    {product.description}
                  </div>
                  <div>
                    <RaisedButton
                      label="Click Me!"
                      secondary={true}
                      style={styles.button}
                      icon={<ActionAndroid />}
                      onTouchTap={this.buttonClick.bind(this)}
                    />
                  </div>
                </div>
              }
            </div>
        </section>
      </div>
    );
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(ProductDetails))
