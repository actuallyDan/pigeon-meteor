import React from 'react';
import ConversationSingle from "./ConversationSingle.jsx";
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class MessageList extends TrackerReact(React.Component) {
	constructor(){
		super();
		this.state = {
			subscription: {
				"userChannels" : Meteor.subscribe("userChannels"),
				"allUsers" : Meteor.subscribe("allUsers"),
				"userMessages" : Meteor.subscribe("userMessages")
			}
		};
	}
	setConvo(userId){
		this.props.setConvo(userId);
	}
	getChannels(){
		return Channels.find({}).fetch();
	}
	render(){
		let channels = this.getChannels();
		
		console.log(channels);

		if(channels.length === 0){
			return (
				<div id="messagesList" className={this.props.show === true ? "" : "hidden"}>
				<div id="no-conversations-dialog">
				<i className="mdi mdi-human-greeting"> </i>
				<p>Looks like you don't have any messages yet</p>
				</div>
				</div>
				)
		} else {
			return(
				<div id="messagesList" className={this.props.show === true ? "" : "hidden"}>{
					channels.map((channel)=>{
						return <ConversationSingle channel={channel} setConvo={this.setConvo.bind(this)} key={channel._id}/>
					})
				}	
				</div>
				)
		}



	}
}