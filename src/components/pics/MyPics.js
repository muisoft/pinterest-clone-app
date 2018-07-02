import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import Masonry from "react-responsive-masonry";
import Masonry from 'react-masonry-component';
import { Card, CardTitle, CardText, Button, TextField, DialogContainer, Divider } from 'react-md';

import {  withMainComponent, withResponsive } from '../hoc';
import axios from 'axios';
import NewPics from './NewPics';
import Pics from './Pics';
import NewPicsDialog from './NewPicsDialog';

class MyPics extends Component {
  componentDidMount = () => {
   this.props.renderMyPics();

  }
  render() {
    let { location, user, mypics, columnsCount, deletePics, showDialog } = this.props;

    let otherProps = {
      label: 'Delete',
      noRate: true,
      location: location
    }
    const styles = {
      container: {
        width: 450,
        marginTop: 40
      },
      newButton: {
        marginTop: 60,
        display: 'inline-flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignContent: 'flex-end'
      },
      showDialog: {
        width: 140
      }
    }
    const masonryOptions = {
             // transitionDuration: '0.6s',
             // itemSelector: '.grid-item',
              columnWidth: 200,
              gutter: 5,
              fitWidth: true
             // isOriginLeft: false
          };
    return (
      <div className="md-grid" style={styles.container}>
        <div className="new-button md-cell md-cell--12 md-cell--10-offset md-cell--9-phone-offset">
          <Button raised primary onClick={showDialog} style={styles.showDialog}>Add new pics</Button>
        </div>


                <Masonry
                 className="md-grid"

                 options={masonryOptions}>
          {
            mypics.map(pic => {
              let props = { ...pic, ...otherProps }
              return (
                <Pics
                  key={pic._id}
                  {...props}
                  onDelete={deletePics}
                />
              )
            })
          }
        </Masonry>
        <NewPicsDialog hide={showDialog}>
          <NewPics />
        </NewPicsDialog>
      </div>
    );
  }
}

MyPics.PropTypes = {
  user: PropTypes.object,
  mypics: PropTypes.arrayOf(PropTypes.object),
  columnsCount: PropTypes.number.isRequired,
  deletePics: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
  renderMyPics: PropTypes.func.isRequired
}

export default withMainComponent(withResponsive(MyPics));
