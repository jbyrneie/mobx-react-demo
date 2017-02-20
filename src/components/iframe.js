import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import AppBar from './appBar';
import Iframe from 'react-iframe';

class IFrame extends Component {
  render() {
    const style = {
      height:'100vw', width:'100vw', position:'fixed'
    }

    return (
      <div>
      <AppBar backArrow={true}/>
        <Iframe ref='iframe' url='https://services.glgresearch.com/referral?source=jack' style={style} frameBorder={0}/>
      </div>
    );
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(IFrame))
