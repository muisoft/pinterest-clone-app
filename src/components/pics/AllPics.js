import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { withResponsive, withMainComponent }  from '../hoc';

import Pics from './Pics';

class AllPics extends Component {
  
  componentDidMount = () => {
    this.props.renderAllPics();
  } 
  
  render() {
    let { location, user, pics, columnsCount, ratePics, width } = this.props;
    let label = '';
    let isDisabled = false;
    let otherProps = {
      label: '',
      isDisabled: isDisabled,
      onRate: ratePics,
      location: location
    }
    if(pics.length === 0 && user){
      return <p style={{margin: '50%'}}>Empty!!! You do not add pics yet</p>
    }
    if(location.pathname === '/'){
      isDisabled = true;
   }
   const masonryOptions = {
    transitionDuration: '0.6s'
   };
  
   const styles = {
      container: {
        width: 200,
        marginTop: 40
      }
    }
    return (
      <div className="md-grid" style={styles.container}>
        <Masonry columnsCount={columnsCount} gutter="5px">
          {
            pics.map(pic => {
              let props = { ...otherProps, ...pic }
              return (
                <Pics
                  key={pic._id}
                  {...props}
                />
              )
            })
          }
        </Masonry>
        </div>
    );
  }
}

AllPics.PropTypes = {
  user: PropTypes.object, 
  pics: PropTypes.arrayOf(PropTypes.object), 
  columnsCount: PropTypes.number, 
  ratePics: PropTypes.func.isRequired, 
  width: PropTypes.number.isRequired
}

export default withMainComponent(withResponsive(AllPics));