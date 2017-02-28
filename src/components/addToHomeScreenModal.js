import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {observer, inject} from 'mobx-react';

class AddToHomeScreenModal extends React.Component {
  state = {
    open: false,
  };

  showMeAgain = () => {
    this.setState({open: false});
  };

  dontShowMeAgain = () => {
    this.setState({open: false});
    localStorage.setItem('dont_show_home_screen_modal', 'true')
  };

  installApp() {
    console.log('installApp deferredPrompt: %s', this.props.store.appStore.deferredPrompt)
    if (this.props.store.appStore.deferredPrompt !== null) {
      // The user has had a postive interaction with our app and Chrome
      // has tried to prompt previously, so let's show the prompt.
      this.props.store.appStore.deferredPrompt.prompt();

      // Follow what the user has done with the prompt.
      this.props.store.appStore.deferredPrompt.userChoice.then(function(choiceResult) {
        console.log(choiceResult.outcome);
        if(choiceResult.outcome === 'dismissed') {
          console.log('User cancelled home screen install');
        }
        else {
          console.log('User added to home screen');
        }

        // We no longer need the prompt.  Clear it up.
        this.props.store.appStore.setDeferredPrompt(null);
      });
    } else {
      let modal = localStorage.getItem('dont_show_home_screen_modal')
  console.log('modal: %s', modal)
      if (modal === null)
        this.setState({open: true});
    }
  }

  componentDidMount() {
    this.installApp()
  }

  render() {
    const actions = [
      <RaisedButton
        label="Dont Show"
        primary={true}
        onTouchTap={this.dontShowMeAgain}
      />,
      <RaisedButton
        label="Show Again"
        primary={true}
        onTouchTap={this.showMeAgain}
        style={{marginLeft:15}}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Add To Home Screen"
          actions={actions}
          modal={true}
          open={this.state.open}
          autoScrollBodyContent={true}
        >
          <p>
          For a better experience, why not add the App to your Home Screen. Doing so will enable the App to behave like a native App.
          </p>
          <p>
          To add to the Home Screen, open the App in Chrome and using the menu select the "Add shortcut" task and click the ADD button.
          </p>
          <p>
          You should now see "Mobx Demo" as an Application on your Home Screen.
          </p>
        </Dialog>
      </div>
    );
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(AddToHomeScreenModal))
