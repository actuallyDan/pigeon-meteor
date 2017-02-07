import React from 'react';
import MessageList from "./MessageList.jsx";
import Conversation from "./Conversation.jsx";
import TopNav from './TopNav.jsx';
import 'sweetalert/dist/sweetalert.css';
import './styles/swaloverride.css';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

Channels = new Mongo.Collection('Channels');
Messages = new Mongo.Collection('Messages');



export default class Dashboard extends TrackerReact(React.Component) {
	constructor(){
		super();
		this.state = {
			view : "messageList",
			conversation : null,
			subscriptions: {
				"channels": Meteor.subscribe("userChannels")
			}
		};
	}
	updateScroll(){
		let documentHeight = document.documentElement.offsetHeight;
		let viewportHeight = window.innerHeight;
		window.scrollTo(0, documentHeight - viewportHeight);
	}
	setConversation(username){
		if(username === null){
			// User is unsetting the conversation and returning to home screen
			this.setState({
				view : "messageList",
				conversation : null
			});

		} else {
			// User is selecting a new or existing conversation to view
			Meteor.call("checkIfChannel", username, (data) => {
				if(data == -1){
					swal("Oops!", "Looks like that user doesn't exist...", "error");
				} else {
					console.log(data);

					this.setState({
						view: "conversation",
						conversation: data,
					});
				}
			});
		}
	}
	updateLastChecked(userId){
		
	}
	sendMessage(refs){
		
		}
		getChannels(){
			return Channels.find().fetch();
		}
		render(){
			let view;
			let channels = this.getChannels();

			console.log(channels);

			switch(this.state.view){
				case "conversation":
				view = <Conversation sendMessage={this.sendMessage.bind(this)}/>;
				break;
				default:
				view = <MessageList setConvo={this.setConversation.bind(this)} channels={channels}/>;
			}
			return(
				<div className="container animated fadeIn">
				<TopNav view={this.state.view} setConversation={this.setConversation.bind(this)} conversation={this.state.conversation}/>
				<div id="dashboard-main">
				{view}
				</div>
				</div>
				)
		}
	}