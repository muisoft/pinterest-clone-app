import React from 'react';
import { Toolbar } from 'react-md';
import ToolbarActions from './ToolbarActions';

const AppToolbar = ({ location, toolbar }) => {
    return (
        <div className="md-grid">
            <Toolbar
                id="app-toolbar"
                title="Piccisy"
                fixed
                colored
                actions={<ToolbarActions {...location} />}>
            </Toolbar>
        </div>
    )
}

export default AppToolbar;