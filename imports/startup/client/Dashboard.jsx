import React from 'react';
import MessageList from "./MessageList.jsx";
import Conversation from "./Conversation.jsx";
import TopNav from './TopNav.jsx';
import 'sweetalert/dist/sweetalert.css';
import './styles/swaloverride.css';

Channels = new Mongo.Collection('Channels');
Messages = new Mongo.Collection('Messages');



export default class Dashboard extends React.Component {
	constructor(){
		super();
		this.state = {
			view : "messageList",
			conversation : null,
			subscription: {
				"userChannels" : Meteor.subscribe("userChannels"),
				"allUsers" : Meteor.subscribe("allUsers"),
				"userMessages" : Meteor.subscribe("userMessages")
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
			console.log(username)
			Meteor.call("checkIfChannel", username, (err, res)=>{

				if(err){
					console.log(err);
				} else {
					this.setState({
						view: "conversation",
						conversation : res
					})
				}
			})
		}	
	}
	updateLastChecked(userId){
		let messagesDb = JSON.parse(window.localStorage.getItem("messages"));

		messagesDb[userId].lastChecked = new Date().getTime();

		window.localStorage.setItem("messages", JSON.stringify(messagesDb));					

	}
	sendMessage(refs){
		let messageInput = refs.messageText.value.trim();
		let timestamp = new Date().getTime();
		let channel = realtime.channels.get(this.state.conversation);
		let thisUser = this.state.user;

		let messagesDb = JSON.parse(window.localStorage.getItem("messages"));
		messagesDb[this.state.conversation].messages.push({
			"userId" : thisUser.userId,
			"username" : thisUser.username, 
			"message" : messageInput, 
			"timestamp" : timestamp
		});
		messagesDb[this.state.conversation].lastChecked = new Date().getTime();

		window.localStorage.setItem("messages", JSON.stringify(messagesDb));

			// Update State
			this.setState({
				view: "conversation",
				conversation: this.state.conversation,
				messagesDb : JSON.parse(window.localStorage.getItem("messages")),
			});

			// Send Message
			channel.publish("message", {"userId" : thisUser.userId, "username": thisUser.username, "message" : messageInput, "timestamp" : timestamp});
			document.getElementById("messageInput").value = "";

			// Scroll to bottom
			//???
		}
		render(){
			let view;
			switch(this.state.view){
				case "conversation":
				view = <Conversation conversation={this.state.messagesDb[this.state.conversation]} sendMessage={this.sendMessage.bind(this)}/>;
				break;
				default:
				view = <MessageList setConvo={this.setConversation.bind(this)}/>;
			}
			return(
				<div className="container animated fadeIn">
				<TopNav view={this.state.view} setConversation={this.setConversation.bind(this)} />
				<div id="dashboard-main">
				{view}
				</div>
				</div>
				)
		}
	}