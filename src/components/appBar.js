import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import SvgIcon from 'material-ui/SvgIcon';
import views from '../views'

class TitleBar extends Component {
  clickLeftIcon = function() {
    if (this.props.backArrow)
      window.history.back()
    else this.props.store.router.goTo(views.home)
  }

  render() {
    const iconStyles = {
      marginRight: 24,
    };

    const HomeIcon = (props) => (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );

    let leftIcon = <IconButton><HomeIcon style={iconStyles} /></IconButton>
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

export default TitleBar
