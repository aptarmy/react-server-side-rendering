import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

class Header extends Component {
  render() {
    return (
      <Helmet>
        <title>{this.props.title}</title>
        <meta name="description" content={this.props.description} />
      </Helmet>
    );
  }
}

const mapStateToProps = (state) => ({
  title: state.pageDetail.title,
  description: state.pageDetail.description
});
const HeaderWithRedux = connect(mapStateToProps)(Header);
export default HeaderWithRedux;
