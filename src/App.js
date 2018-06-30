import React, { Component } from 'react';
import { NavigationDrawer, Button, FontIcon, Modal, SelectionControl, SelectionControlGroup, TextField, DialogContainer  } from 'react-md';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	state = {
    visible: false,
    focusOnMount: true,
    containFocus: true,
    initialFocus: undefined,
  };

  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  handleTargetChange = (value) => {
    this.setState({ initialFocus: value ? `#${value}` : undefined });
  };

  handleMountChange = (checked) => {
    this.setState({ focusOnMount: checked });
  };

  handleFocusChange = (checked) => {
    this.setState({ containFocus: checked });
  };

  render() {
	    const { visible, initialFocus, focusOnMount, containFocus } = this.state;
    const actions = [{
      id: 'dialog-cancel',
      secondary: true,
      children: 'Cancel',
      onClick: this.hide,
    }, {
      id: 'dialog-ok',
      primary: true,
      children: 'Ok',
      onClick: this.hide,
    }];


    return (
      <NavigationDrawer
        drawerTitle="react-md with CRA"
        toolbarTitle="Welcome to react-md"
      >
        <div className="App">

        <form className="md-grid" onSubmit={this.handleSubmit}>
          <SelectionControlGroup
            id="focus-target"
            name="focus-targets"
            type="radio"
            controls={[]}
            disabled={!containFocus}
            onChange={this.handleTargetChange}
          />
          <SelectionControl
            id="focus-on-mount"
            name="focus-dialog-controls"
            type="checkbox"
            label="Focus on mount"
            checked={focusOnMount}
            onChange={this.handleMountChange}
          />
          <SelectionControl
            id="focus-dialog-contain"
            name="focus-dialog-controls"
            type="checkbox"
            label="Contain focus"
            checked={containFocus}
            onChange={this.handleFocusChange}
          />
        </form>
        <Button raised onClick={this.show}>Open the Dialog</Button>
        <DialogContainer
          id="focus-control-dialog"
          title="Focus Control Example"
          visible={visible}
          actions={actions}
          onHide={this.hide}
          initialFocus={initialFocus}
          focusOnMount={focusOnMount}
          containFocus={containFocus}
          contentClassName="md-grid"
        >
          <TextField id="field-1" label="Field 1" placeholder="Lorem ipsum" className="md-cell md-cell--12" />
          <TextField id="field-2" label="Field 2" placeholder="Multiline text here" rows={2} className="md-cell md-cell--12" />
        </DialogContainer>

		  </div>
      </NavigationDrawer>
    );
  }
}

export default App;
