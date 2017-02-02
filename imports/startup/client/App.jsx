import React, { Component } from 'react';
import Dashboard from './Dashboard.jsx';
import LoginForm from './LoginForm';

export default class App extends Component {
constructor(props) {
    	super(props);
   		this.state = {
			currentUser : Meteor.userId(),
			loggedIn: Meteor.userId() === null ? false : true,
   		};
	}
	onChange(flag){
		this.setState({currentUser : Meteor.userId(), isLoggedIn: flag});
	}
	changeViews(view){
		this.setState({mobileView : view});
	}
  loggedInChange(flag){
    this.setState({loggedIn : flag});
  }
  render() {
    return (
      <div className="App">
		{this.state.loggedIn ? <Dashboard /> : <LoginForm loggedInChange={this.loggedInChange.bind(this)} />}
     
		</div>
      );
  }
}
