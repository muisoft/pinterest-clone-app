import React from 'react';
import PropTypes from 'prop-types';
import { DialogContainer } from 'react-md';

import { withMainComponent } from '../hoc';

const NewPicsDialog = ({ children, dialog, hide }) => {
    let { visible, initialFocus, focusOnMount, containFocus } = dialog;
    return (
        <DialogContainer
            id="new-pics-dialog"
             aria-describedby="speed-boost-description"
            visible={visible}
            onHide={hide}
            initialFocus={initialFocus}
            focusOnMount={focusOnMount}
            containFocus={containFocus}
            contentClassName="md-grid"
            modal
            width='auto'
            height='auto'
            style={{ backgroundColor: 'rgba(0,128,128, 0.05)' }}>
            {children}
        </DialogContainer>
    );
}
NewPicsDialog.propTypes = {
    children: PropTypes.element.isRequired,
    dialog: PropTypes.object.isRequired, 
    hide: PropTypes.bool.isRequired 
}

export default withMainComponent(NewPicsDialog);
