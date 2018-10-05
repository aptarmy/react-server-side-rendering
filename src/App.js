import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import pageDetailActions from './actions/pageDetail';

import Document from './components/Document';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

import './App.css';


class App extends Component {
  
  componentDidMount() {
    this.props.pageDetailUpdate(this.props.location.pathname);
  }
  
  componentDidUpdate(prevProps) {
    if(this.props.location.pathname !== prevProps) {
      this.props.pageDetailUpdate(this.props.location.pathname);
    }
  }
  
	render() {
		return(
			<React.Fragment>
        <Header />
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/about-us">About Us</Link></li>
				</ul>
				<Switch>
					<Route path="/" exact={true} component={Home} />
					<Route path="/about-us" exact={true} component={About} />
					<Route component={NotFound} />
				</Switch>
				<Document />
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
  pageDetailUpdate(pathname) {
    dispatch(pageDetailActions.update(pathname));
  }
});
const AppWithRedux = connect(null, mapDispatchToProps)(App)

const AppWithRouter = withRouter(AppWithRedux);

export default AppWithRouter;
