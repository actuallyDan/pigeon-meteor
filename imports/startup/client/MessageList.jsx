import React from 'react';
import ConversationSingle from "./ConversationSingle.jsx";

export default class MessageList extends React.Component {
	setConvo(userId){
		this.props.setConvo(userId);
	}
	render(){
		let channels = this.props.channels;
		console.log(channels);
		if(channels.length === 0){
			return (
				<div id="messagesList">
				<div id="no-conversations-dialog">
				<i className="mdi mdi-human-greeting"> </i>
				<p>Looks like you don't have any messages yet</p>
				</div>
				</div>
				)
		} else {
			return(
				<div id="messagesList">{
					channels.map((channel)=>{
						return <ConversationSingle channel={channel} setConvo={this.setConvo.bind(this)} key={channel._id}/>
					})
				}	
				</div>
				)
		}



	}
}