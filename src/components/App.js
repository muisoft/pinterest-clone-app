import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Toolbar, Button } from 'react-md';

import { MyPics, AllPics } from './pics';
import { Account } from './account';
import { ToolbarActions, AppToolbar } from './toolbar';
import { ProtectedRoute } from './protected';

import './style/styles.css';

class App extends Component {
    render() {
        return (
            <div style={{ height: 480 }}>
                <Route
                    render={({ location }) => (
                        <div>
                            <AppToolbar location={location} />
                            <Switch key={location.key}>
                                <Route exact path="/" location={location} component={AllPics}/>
                                <Route path="/account/:type" location={location} component={Account} />
                                <Route path="/allpics" location={location} component={AllPics} />
                                <ProtectedRoute path="/mypics" location={location} component={MyPics} />
                            </Switch>
                        </div>
                    )} />
            </div>
        );
    }
}

export default App;
