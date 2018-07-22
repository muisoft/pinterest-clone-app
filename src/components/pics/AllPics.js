import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';
import { withMainComponent } from '../hoc';
import Pics from './Pics';

class AllPics extends Component {

  componentDidMount = () => {
    this.props.renderAllPics();
  }

  render() {
    let { location, user, pics, ratePics } = this.props;
    let label = '';
    let isDisabled = false;
    let otherProps = {
      label: '',
      isDisabled: isDisabled,
      onRate: ratePics,
      location: location
    }
    if (!pics && user.username) {
      return <p style={{ margin: '50%' }}>Empty!!! You do not add pics yet</p>
    }
    if (location.pathname === '/') {
      isDisabled = true;
    }
    const masonryOptions = {
      transitionDuration: '0.6s',
      columnWidth: 200,
      gutter: 5,
      fitWidth: true
    };

    const styles = {
      container: {
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
  ratePics: PropTypes.func.isRequired
}

export default withMainComponent(AllPics);
