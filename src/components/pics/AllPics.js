import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Masonry from 'react-masonry-component';
import { withResponsive, withMainComponent }  from '../hoc';
import Pics from './Pics';
import axios from 'axios';
class AllPics extends Component {

  componentDidMount = () => {
    this.props.renderAllPics();
    axios({
  method:'get',
  url:'/allpics',
  responseType:'json'
})
      .then(res => console.log(res.data))
      .then(err => console.log(err));
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
    if(pics.length === 0 && user.username){
      return <p style={{margin: '50%'}}>Empty!!! You do not add pics yet</p>
    }
    if(location.pathname === '/'){
      isDisabled = true;
   }
   const masonryOptions = {
            // transitionDuration: '0.6s',
            // itemSelector: '.grid-item',
             columnWidth: 200,
             gutter: 5,
             fitWidth: true
            // isOriginLeft: false
         };

   const styles = {
      container: {
        //width: 200,
        marginTop: 60
      }
    }
    return (

        <Masonry
         className="md-grid"
         style={styles.container}
         options={masonryOptions}>
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



/**
  <div className="md-grid" style={styles.container}>
  <Masonry columnsCount={columnsCount} gutter="5px">
**/
