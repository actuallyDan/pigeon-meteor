import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../imports/startup/client/App.jsx';
import './main.less';
import './animate.css';
// import 'react-fastclick';

class MainWrapper extends React.Component {
	render(){

		return (<div className='main-wrapper'>
			<App />
			</div>)
	}
}
ReactDOM.render(<MainWrapper />, document.getElementById('app'));