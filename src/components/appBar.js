import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Menu from 'material-ui/svg-icons/navigation/menu';
import views from '../views'

class TitleBar extends Component {

  clickLeftIcon = function() {
    if (this.props.backArrow)
      window.history.back()
    else this.props.store.router.goTo(views.home)
  }

  render() {
    let leftIcon = <IconButton><Menu /></IconButton>
    if (this.props.backArrow)
      leftIcon = <IconButton><ArrowBack /></IconButton>

    return (
      <AppBar
        title="My Products Store"
        iconElementLeft={leftIcon}
        onLeftIconButtonTouchTap={this.clickLeftIcon.bind(this) }
      />
    );
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(TitleBar))
