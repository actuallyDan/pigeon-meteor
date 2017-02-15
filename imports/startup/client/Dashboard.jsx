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
			subscription: {
				"userChannels" : Meteor.subscribe("userChannels"),
				"allUsers" : Meteor.subscribe("allUsers"),
				"userMessages" : Meteor.subscribe("userMessages")
			},
			width: window.innerWidth > 1399 ? (window.innerWidth - 300) : window.innerWidth > 992 ? (window.innerWidth - 300) : window.innerWidth,
			
		};
	}

	handleResize(){
		let newWidth = window.innerWidth > 1399 ? (window.innerWidth - 700) : window.innerWidth > 992 ? (window.innerWidth - 300) : window.innerWidth;
		this.setState({width: newWidth});
	}
	componentWillUnmount(){
		window.removeEventListener('resize');
	}
	componentDidMount() {
		window.addEventListener('resize', this.handleResize.bind(this));	
	}
	updateScroll(){
		let documentHeight = document.documentElement.offsetHeight;
		let viewportHeight = window.innerHeight;
		window.scrollTo(0, documentHeight - viewportHeight);
	}
	setConversation(channelId){
		if(channelId === null){
			// User is unsetting the conversation and returning to home screen
			this.setState({
				view : "messageList",
				conversation : null
			});

		} else {
			// User is selecting a new or existing conversation to view
			this.setState({
				view : "conversation",
				conversation : channelId
			});
		}	
		this.updateScroll();
	}
	newConvo(username){
		Meteor.call("checkIfChannel", username, (err, res)=>{

			if(err){
				console.log(err);
			} else if(res === -1){
				swal("Oops!", "No user exists by that name.", "error");
			} else {
				this.setState({
					view: "conversation",
					conversation : res
				});
				console.log("setting state");
			}
		})
	}
	updateLastChecked(userId){
		let messagesDb = JSON.parse(window.localStorage.getItem("messages"));
		messagesDb[userId].lastChecked = new Date().getTime();
		window.localStorage.setItem("messages", JSON.stringify(messagesDb));					
	}
	sendMessage(refs){
		let messageInput = refs.messageText.value.trim();
		let timestamp = new Date().getTime();
		let thisUser = Meteor.user();

		let message = {
			channel : this.state.conversation,
			username : thisUser.username,
			timestamp: timestamp,
			message: messageInput
		};
		Meteor.call("sendMessage", message, (err, res)=>{
			if(err){
				console.log(err)
			} else {
				document.getElementById("messageInput").value = "";

				this.forceUpdate();
			// Scroll to bottom
			this.updateScroll();
		}
	});
	}
	componentDidMount(){
		this.setState({
			conversation: Channels.findOne({})._id
		});
	}
	render(){

		let viewMessages =  this.state.view === 'messageList' ? true : this.state.width >= 992 ? true : false;
		let viewConversation = this.state.view === 'conversation' ? true : this.state.width >= 992 ? false : true;
		let conversation = Messages.find({channel: this.state.conversation}).fetch()
		
		return(
			<div className="container animated fadeIn">
			<TopNav view={this.state.view} setConversation={this.setConversation.bind(this)} newConvo={this.newConvo.bind(this)}  />
			<div id="dashboard-main">
			<MessageList show={viewConversation} setConvo={this.setConversation.bind(this)}/>
			<Conversation show={viewMessages} conversation={conversation} sendMessage={this.sendMessage.bind(this)} channelId={this.state.conversation}/>
			</div>
			</div>
			)
	}
}