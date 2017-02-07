import React from 'react';
import moment from 'moment';

export default class ConversationSingle extends React.Component {
	setConvo(){
		this.props.setConvo(this.props.channel._id)
	}
	render(){
		let conversation = this.props.channel;

		let members = conversation.members.filter((item)=>{return item !== Meteor.userId()}).toString();

		let lastMessage = Messages.find({"channel" : conversation._id}).fetch();
		lastMessage = lastMessage[lastMessage.length - 1];
		return(
			<div className="conversation-item" onClick={this.setConvo.bind(this)}> 
					<p className="conversation-item-username">{members}</p>
					<span className="conversation-item-last-message">{lastMessage.username + ": " +lastMessage.message}</span>
					<br/>
					<span className="conversation-item-time">{moment(lastMessage.timestamp).format("h:mm a")}</span>
				</div>
				)
	}
}