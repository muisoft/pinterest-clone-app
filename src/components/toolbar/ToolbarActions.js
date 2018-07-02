import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Avatar,
  FontIcon,
  AccessibleFakeButton,
  IconSeparator,
  DropdownMenu,
} from 'react-md';

import { AccountMenu } from '../account';
import  { withMainComponent }  from '../hoc';

const ToolbarActions = ({ toLogin, toAllPics, toMyPics, pics, newBook, pathname, user }) => {
    const actions = () => {
       if (user.username ) {
            return (
                <div className="md-grid">
                    <Button flat style={{ marginTop: 6 }} onClick={toAllPics}>All Pics</Button>
                    <Button flat style={{ marginTop: 6 }} onClick={toMyPics}>My Pics</Button>
                    <AccountMenu
                        simplifiedMenu
                        username={user.username}
                        image={user.thumbnail} />
                </div>
            )
      } else {
            return (
                <div className="md-grid" >
                    <Button icon onClick={toLogin}>account_circle</Button>
                </div>
            )
        }
    }
    return (
        <div style={{ lineHeight: 3, fontSize: 18 }}>
            {actions()}
        </div>
    )
}

ToolbarActions.PropTypes = {
    toLogin: PropTypes.func.isRequired,
    toAllPics: PropTypes.func.isRequired,
    toMyPics: PropTypes.func.isRequired,
    pics: PropTypes.arrayOf(PropTypes.object),
    newBook: PropTypes.func,
    pathname: PropTypes.shape,
    user: PropTypes.object
}

export default  withMainComponent(ToolbarActions);
