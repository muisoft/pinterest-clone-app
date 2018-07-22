import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mapStateToProps, mapDispatchToProps } from './utils/reducer';
import { actionsWrapper } from './utils/actionsWrapper';

export const withMainComponent = function (ChildComponent) {
    class WithMainComponent extends Component {
        render() {
            let actionsProps = actionsWrapper({ ...this.props });
            let childProps = { ...this.props, ...actionsProps };
            return (
                <ChildComponent {...childProps} />
            );
        }
    } 
    return connect(mapStateToProps, mapDispatchToProps)(WithMainComponent);
}
export default withMainComponent;