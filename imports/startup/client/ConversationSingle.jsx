import React from 'react';
import moment from 'moment';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ConversationSingle extends TrackerReact(React.Component) {
	constructor(){
		super();
		this.state = {
			subscription: {
				"allUsers" : Meteor.subscribe("allUsers"),
				"userMessages" : Meteor.subscribe("userMessages")
			}
		};
	}
	setConvo(){
		this.props.setConvo(this.props.channel._id)
	}
	getLastMessage(){
		return Messages.find({"channel" : this.props.channel._id}).fetch();
	}
	getMember(member){
		return Meteor.users.findOne({'_id' : member}).username
	}
	render(){
		let members = this.props.channel.members.filter((item)=>{return item !== Meteor.userId()});
		members = members.map((member)=>{ return this.getMember(member) }).toString();
		let lastMessage = this.getLastMessage();
		
		if(lastMessage.length !== 0){
			lastMessage = lastMessage[lastMessage.length - 1];
			return(
				<div className="conversation-item" onClick={this.setConvo.bind(this)}> 
				<p className="conversation-item-username">{members}</p>
				<span className="conversation-item-last-message">{lastMessage.username + ": " +lastMessage.message}</span>
				<br/>
				<span className="conversation-item-time">{moment(lastMessage.timestamp).format("h:mm a")}</span>
				</div>
				)
		} else {
			return(
				<div className="conversation-item" onClick={this.setConvo.bind(this)}> 
				<p className="conversation-item-username">{members}</p>
				</div>
				)
		}
	}
}