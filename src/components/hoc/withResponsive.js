import React, { Component } from 'react';

const withResponsive = (ChildComponent) => 
    class WithResponsive extends Component {
      constructor(props) {
        super(props);
        this.state = {
          count: 4,
          width: false
        }
      }
      componentDidMount = () => {
        window.addEventListener('resize', this.handleResize);
      }
      componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleResize);
      }
      handleResize = () => {
        let width = window.innerWidth;
        let newWidth = width;
        let count = 4;
        if (width < 480) {
          count = 1;
        } else if (width >= 480 && width < 750) {
          count = 2;
        } else if (width >= 750 && width < 900) {
          count = 3;
        } else if (width >= 900) {
          count = 4;
        }
        this.setState({
          count: count,
          width: width
        })
      }
      render() { 
        return (
          <ChildComponent {...this.props} width={this.state.width} columnsCount={this.state.count} />
        );

      }
}  

export { withResponsive };