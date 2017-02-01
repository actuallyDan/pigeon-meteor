import React from 'react';
import ReactDOM from 'react-dom';
import App from '../imports/startup/client/App.jsx';
import './main.less';
import './animate.css';

class MainWrapper extends React.Component {
	render(){

		return (<div className='main-wrapper'>
			<App />
			</div>)
	}
}
ReactDOM.render(<MainWrapper />, document.getElementById('app'));